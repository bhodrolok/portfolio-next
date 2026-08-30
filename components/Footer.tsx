import Link from "next/link";

import { LatestGitCommit } from "./LatestGitCommit";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-row footer-row-top">
          <div className="footer-cell">
            <p>© 2026 Ranadip Chatterjee</p>
          </div>

          <div className="footer-cell" aria-label="88x31 buttons">
            {/* TODO: Add 88x31 buttons here */}
            <p>Some buttons here?</p>
          </div>

          <div className="footer-cell">
            <LatestGitCommit />
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-row footer-row-bottom">
          <div className="footer-cell">
            <p className="muted">Made with: bun · Next.js · Tailwind · ❤️  · 🍛 · ☕</p>
          </div>

          <div className="footer-cell" aria-label="88x31 buttons">
            {/* TODO: Add 88x31 buttons or something else here*/}
            <p>Something else here?</p>
          </div>

          <div className="footer-cell footer-links">
            <Link
              href="https://github.com/foo/bar"
              target="_blank"
              rel="noreferrer"
              className="source-link"
            >
              source code ↗
            </Link>
            {/* TODO: Server time (H:M:S)? Abacus? idk */}
            <span>hello world placeholder</span>
          </div>
        </div>
      </div>
    </footer>
  );
}