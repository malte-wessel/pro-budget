import { css } from "lit";

// Shared look: Home Assistant theme tokens only, no fixed widths.
export const sharedStyles = css`
  * {
    box-sizing: border-box;
  }
  h2 {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0 0 4px;
  }
  .muted {
    color: var(--secondary-text-color);
  }
  .small {
    font-size: 0.85em;
  }
  .flex {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .grow {
    flex: 1;
  }
  .grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  ha-card {
    padding: 16px;
  }
  .cards {
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
  }
  table.plain {
    width: 100%;
    border-collapse: collapse;
  }
  table.plain th,
  table.plain td {
    text-align: left;
    padding: 8px 8px;
    border-bottom: 1px solid var(--divider-color);
    vertical-align: middle;
  }
  table.plain th {
    color: var(--secondary-text-color);
    font-weight: 500;
    font-size: 0.85em;
    white-space: nowrap;
  }
  table.plain tr:last-child td {
    border-bottom: none;
  }
  td.num,
  th.num {
    text-align: right;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .pill {
    display: inline-block;
    padding: 2px 8px;
    margin-left: 6px;
    border-radius: 12px;
    font-size: 12px;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    white-space: nowrap;
  }
  .earning {
    color: var(--success-color, #43a047);
  }
  .expense {
    color: var(--error-color, #db4437);
  }
  .saving {
    color: var(--info-color, #4a90d9);
  }
  .stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .stat .label {
    color: var(--secondary-text-color);
    font-size: 0.85em;
  }
  .stat .value {
    font-size: 1.5rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
  .select {
    height: 40px;
    padding: 0 36px 0 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--card-background-color)
      url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%23888' d='M7 10l5 5 5-5z'/></svg>")
      no-repeat right 8px center / 20px;
    color: var(--primary-text-color);
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
  }
  .toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px 16px 0;
  }
  .toolbar .spacer {
    flex: 1;
  }
  .members {
    padding: 12px 16px 0;
  }
  .version {
    padding: 24px;
    text-align: center;
    color: var(--secondary-text-color);
    font-size: 12px;
  }
  .chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    border-radius: 18px;
    height: 36px;
    padding: 0 14px;
    cursor: pointer;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    --chip-color: var(--primary-color);
  }
  .chip .avatar {
    margin-left: -8px;
  }
  .chip[aria-pressed="true"] {
    background: color-mix(in srgb, var(--chip-color) 16%, transparent);
    border-color: transparent;
  }
  .bar {
    height: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    overflow: hidden;
  }
  .bar > div {
    height: 100%;
    background: var(--primary-color);
  }
  .empty {
    padding: 24px;
    text-align: center;
    color: var(--secondary-text-color);
  }
  .scroll {
    overflow-x: auto;
  }
  ha-icon {
    --mdc-icon-size: 20px;
  }
`;

// The dashboard views (overview, calendar): toolbar with period navigation, a two-column grid
// of cards, card heads, rows and tiles. Theme tokens only.
export const dashboardStyles = css`
      .toolbar {
        max-width: 1240px;
        margin: 0 auto;
        padding: 16px 16px 0;
        gap: 12px;
      }
      .toolbar .members {
        padding: 0;
        margin-left: auto;
      }
      .period {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .period .title {
        display: flex;
        flex-direction: column;
        min-width: 150px;
        text-align: center;
      }
      .period .month {
        font-size: 20px;
        line-height: 26px;
        font-weight: 500;
      }
      .cards {
        max-width: 1240px;
      }
      .dashboard {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(320px, 1fr);
        gap: 16px;
        align-items: start;
      }
      .col {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
      }
      .pair {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
      }
      @media (max-width: 1000px) {
        .dashboard {
          grid-template-columns: minmax(0, 1fr);
        }
      }
      @media (max-width: 600px) {
        .plot .label {
          display: none;
        }
      }
      ha-card {
        display: flex;
        flex-direction: column;
        gap: 14px;
        /* A light tile grey on any theme: a faint tint of the text colour on the card. */
        --tile-background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .head ha-svg-icon {
        color: var(--secondary-text-color);
      }
      .head h2 {
        flex: 1;
        margin: 0;
        font-size: 16px;
      }
      .head .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .num {
        font-variant-numeric: tabular-nums;
      }
      .link {
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-color);
        text-decoration: none;
        cursor: pointer;
      }
      .link:hover {
        text-decoration: underline;
      }
      .indent {
        padding-left: 52px;
      }
      .col-text {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .good {
        color: var(--success-color);
      }
      .bad {
        color: var(--error-color);
      }
      .warn {
        color: var(--warning-color);
      }
      /* rows with an icon, text and an amount */
      .row {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .row .grow {
        min-width: 0;
      }
      .row .name {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .row.paid > :not(.paid-toggle) {
        opacity: 0.55;
      }
      .paid-toggle {
        --mdc-icon-button-size: 36px;
        margin-right: -8px;
        color: var(--secondary-text-color);
      }
      .row.paid .paid-toggle {
        color: var(--success-color);
      }
      .row.paid .name {
        text-decoration: line-through;
      }
      .row.dim {
        opacity: 0.45;
      }
      .small {
        font-size: 12px;
        line-height: 16px;
      }
      .muted {
        color: var(--secondary-text-color);
      }
      .divider {
        border-top: 1px solid var(--divider-color);
        margin: 4px 0;
      }
`;
