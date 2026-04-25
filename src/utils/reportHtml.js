// server/src/utils/reportHtml.js
export function buildReportHtml(report = {}, agenda = []) {
  // Minimal CSS: you can expand to match your site styles
  const css = `
    body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; line-height: 1.4; }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 18px; }
    h1 { font-size: 20px; margin: 0 0 8px; }
    h2 { font-size: 16px; margin: 0 0 10px; color: #065f46; }
    .meta { text-align: center; color: #374151; margin-bottom: 12px; }
    .section { margin-bottom: 14px; }
    .section h3 { color: #065f46; font-size: 14px; margin-bottom: 8px; }
    .agenda-item { padding: 8px; border-radius: 6px; background: #f8fafc; margin-bottom: 8px; }
    ul { padding-left: 18px; margin: 0; }
    .sign { display:flex; justify-content:space-between; margin-top: 22px; }
    .small { font-size: 12px; color: #6b7280; margin-top: 6px; }
  `;

  const agendaHtml = (agenda || [])
    .map(
      (a) => `
    <div class="agenda-item">
      <strong>${escapeHtml(a.title)}</strong>
      <div>${escapeHtml(a.resolution)}</div>
    </div>`
    )
    .join("\n");

  const membersHtml = (report.members || [])
    .map((m) => `<li>${escapeHtml(m)}</li>`)
    .join("\n");

  const additionalHtml = (report.additionalMembers || [])
    .map((m) => `<li>${escapeHtml(m)}</li>`)
    .join("\n");

  return `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(report.title || "AGM Report")}</title>
    <style>${css}</style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Tamilnadu Association of Senior Professionals of Environment and Forestry (TASPEF)</h1>
        <h2>${escapeHtml(report.title || "Minutes of the AGM")}</h2>
        <div class="meta">
          <div><strong>Date:</strong> ${escapeHtml(report.date || "")}</div>
          <div><strong>Time:</strong> ${escapeHtml(report.time || "")}</div>
          <div><strong>Venue:</strong> ${escapeHtml(report.venue || "")}</div>
        </div>
      </div>

      <div class="section">
        <h3>Meeting Officials</h3>
        <div>
          ${escapeHtml(report.officials || "President: ...")}
        </div>
      </div>

      <div class="section">
        <h3>Members Present</h3>
        <ul>
          ${membersHtml}
        </ul>
      </div>

      <div class="section">
        <h3>Additional Members Joined</h3>
        <ul>
          ${additionalHtml}
        </ul>
      </div>

      <div class="section">
        <h3>Agenda Items and Resolutions</h3>
        ${agendaHtml}
      </div>

      <div class="section">
        <h3>Meeting Conclusion</h3>
        <div>The AGM concluded at ${escapeHtml(
          report.conclusionTime || "---"
        )}</div>
        <div class="sign">
          <div>
            <div class="small">Dr.V.T.Kandasamy IFS (Retd)</div>
            <div>President</div>
          </div>
          <div>
            <div class="small">D.Arun</div>
            <div>General Secretary</div>
          </div>
        </div>
      </div>

      <div class="small">Generated: ${new Date().toLocaleString()}</div>
    </div>
  </body>
  </html>
  `;
}

// small helper to avoid XSS in template (we are server-side, but still)
function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
