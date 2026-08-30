type Commit = {
  sha: string;
  message: string;
  html_url: string;
  date: string;
};

async function getLatestCommitGitHub(): Promise<Commit | null> {
  const githubAPIURL = "https://api.github.com/repos/bhodrolok/portfolio-next/commits/main";

  try {
    const response = await fetch(githubAPIURL);

    if (!response.ok) {
      throw new Error(`GitHub API returned: ${response.status}`);
    }

    const result = await response.json();
    // The first 7 digits (short SHA-1) are enough to identify 
    // (https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection) 
    const sha = result.sha.substring(0, 7);
    const message = result.commit.message.substring(0, 21);

    // The 'date' value is a `datestring` in the ISO 8601 format (Z tz = UTC) i.e. "2011-10-05T14:48:00.000Z"
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };

    const date = new Date(result.commit.author.date).toLocaleDateString(
      navigator.language,
      dateOptions
    );

    // Use the full commit SHA for the URL so it's a bit more... robust?  
    return {
      sha,
      message,
      html_url: `https://github.com/bhodrolok/portfolio-next/commit/${result.sha}`,
      date,
    };
  } catch (error) {
    console.error("Failed to fetch the latest commit from GitHub:", error);
    return null;
  }
}

export async function LatestGitCommit() {
  const commit = await getLatestCommitGitHub();

  if (!commit) {
    return (
      <p className="commit">
        <span className="muted">unable to fetch commit info from GitHub rip</span>
      </p>
    );
  }

  return (
    <a
      href={commit.html_url}
      target="_blank"
      rel="noreferrer"
      className="commit"
      title={commit.message}
    >
      <span>Site updated: </span>
      <span> {commit.date}</span>
      <code> ({commit.sha})</code>
      <span> - {commit.message}</span>
    </a>
  );
}