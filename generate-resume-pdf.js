const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "Shreyas_Nalawade_Resume.pdf");
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 32, bottom: 32, left: 40, right: 40 },
  info: {
    Title: "Shreyas Nalawade - Resume",
    Author: "Shreyas Nalawade",
    Subject: "Full Stack Developer Resume",
  },
});

const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
const left = doc.page.margins.left;
const rightEdge = doc.page.width - doc.page.margins.right;
let pageCount = 1;

function ensureSpace(needed = 40) {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
    pageCount += 1;
  }
}

function section(title) {
  ensureSpace(30);
  doc.moveDown(0.55);
  doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#111111").text(title.toUpperCase(), {
    characterSpacing: 0.6,
  });
  const y = doc.y + 3;
  doc.moveTo(left, y).lineTo(rightEdge, y).lineWidth(1).strokeColor("#111111").stroke();
  doc.y = y + 8;
}

function bullet(text) {
  ensureSpace(24);
  const textX = left + 12;
  const startY = doc.y;
  doc.font("Helvetica").fontSize(9).fillColor("#111111");
  doc.text("•", left, startY, { width: 10 });
  doc.text(text, textX, startY, {
    width: pageWidth - 12,
    align: "left",
    lineGap: 2,
  });
  doc.moveDown(0.32);
}

function entryHeader(title, date) {
  ensureSpace(24);
  doc.moveDown(0.18);
  const titleWidth = pageWidth * 0.72;
  const dateWidth = pageWidth * 0.28;
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9.6).fillColor("#111111").text(title, left, y, {
    width: titleWidth,
  });
  const titleBottom = doc.y;
  if (date) {
    doc
      .font("Helvetica-Bold")
      .fontSize(8.7)
      .fillColor("#333333")
      .text(date, left + titleWidth, y, { width: dateWidth, align: "right" });
  }
  doc.y = Math.max(titleBottom, doc.y) + 2;
}

function stackLine(text) {
  doc
    .font("Helvetica-Oblique")
    .fontSize(8.2)
    .fillColor("#444444")
    .text(text, { width: pageWidth, lineGap: 1.2 });
  doc.moveDown(0.14);
}

// Header with profile photo (top-right)
const profilePath = path.join(__dirname, "profile.png");
const photoSize = 68;
const photoX = rightEdge - photoSize;
const photoY = doc.page.margins.top;
const headerWidth = pageWidth - photoSize - 14;

if (fs.existsSync(profilePath)) {
  doc.image(profilePath, photoX, photoY, {
    width: photoSize,
    height: photoSize,
    fit: [photoSize, photoSize],
    align: "center",
    valign: "center",
  });
}

doc.font("Helvetica-Bold").fontSize(17).fillColor("#111111").text("SHREYAS NALAWADE", left, photoY, {
  width: headerWidth,
});
doc.moveDown(0.18);
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor("#222222")
  .text("Full Stack Developer | Java | Spring Boot | Laravel | React", left, doc.y, {
    width: headerWidth,
  });
doc.moveDown(0.22);
doc
  .font("Helvetica")
  .fontSize(8.4)
  .fillColor("#333333")
  .text(
    "Mumbai, Maharashtra, India  |  shreyasnalawade2002@gmail.com",
    left,
    doc.y,
    { width: headerWidth, lineGap: 2 }
  );
doc.text("linkedin.com/in/shreyas-s-nalawade-234340283", left, doc.y, { width: headerWidth });
doc.text("github.com/ShreyasNalawade  |  shreyas.ssngo.shop", left, doc.y, { width: headerWidth });

// Keep content below photo area
doc.y = Math.max(doc.y, photoY + photoSize + 10);

section("Professional Summary");
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor("#111111")
  .text(
    "Full Stack Developer with production experience building high-scale CPaaS platforms, digital signage systems, and SaaS partner portals used by millions of end users. Skilled in Java, Spring Boot, Laravel/PHP, React, JavaScript, MySQL/MariaDB, MongoDB, Redis, and Kafka. At Insign Technology, worked with the team on SMS/RCS/WhatsApp/Voice/Email campaigns, IP-TV networks, payments, AI tooling, REST APIs, and scalable reporting.",
    { width: pageWidth, align: "left", lineGap: 2.6 }
  );

section("Technical Skills");
const skills = [
  ["Languages", "Java, JavaScript, PHP 8.2, SQL, HTML5, CSS3"],
  ["Backend", "Laravel, Spring Boot, REST APIs, Webhooks, Queue Jobs (Horizon), JDBC, Hibernate"],
  ["Frontend", "React.js, JavaScript, Blade, Vite, Tailwind CSS, jQuery"],
  ["Databases", "MySQL, MariaDB, MongoDB, Redis, Oracle SQL"],
  ["Integrations", "Kafka, SMPP/Kannel, WhatsApp Cloud API, RCS, Razorpay, Google Business, SMTP"],
  ["Tools", "Git, GitHub Actions, Linux/VPS, Laravel Sanctum, DomPDF, Telescope, Postman"],
];
skills.forEach(([label, value]) => {
  ensureSpace(14);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9).fillColor("#111111").text(label + ":", left, y, {
    width: 88,
  });
  doc.font("Helvetica").fontSize(9).fillColor("#111111").text(value, left + 92, y, {
    width: pageWidth - 92,
    lineGap: 1.2,
  });
  doc.moveDown(0.16);
});

section("Professional Experience");
entryHeader("Software Engineer — Insign Technology Pvt Ltd", "Mar 2025 – Present");
doc
  .font("Helvetica-Oblique")
  .fontSize(8.5)
  .fillColor("#333333")
  .text("Mumbai, Maharashtra | Full Stack Development (CPaaS, Digital Signage & SaaS Platforms)");
doc.moveDown(0.22);
[
  "Multichannel CPaaS — Built scalable SMS/RCS/WhatsApp/Voice/Email campaign system in Laravel with Kannel, Redis/Kafka pipelines, and million-row reporting for millions of users.",
  "IP TV Platform — Developed digital signage campaign management for multi-outlet Android TV networks with device APIs, playlist scheduling, RBAC, and analytics.",
  "Dukandari Partners — Built multi-tenant partner/admin portal with Razorpay billing, AI usage monitoring, Google Business outlets, and AI voice-agent support.",
  "Delivered inventory, clinic CRM, and supporting REST APIs; collaborated with team on releases, dashboards, and production monitoring.",
].forEach(bullet);

section("Projects");

entryHeader("Multichannel Messaging Platform (CPaaS) — SMS, RCS, WhatsApp, Voice & Email");
stackLine(
  "PHP 8.2 · Laravel · MySQL/MariaDB · Redis · Kafka · Horizon · SMPP/Kannel · WhatsApp Cloud API · REST APIs · Blade/Vite/Tailwind"
);
[
  "Built production multichannel platform for bulk campaigns, delivery tracking, billing, and admin ops across SMS, RCS, WhatsApp, Voice, and Email for millions of users.",
  "Integrated Kannel SMS gateway (SMPP) with vendor/route management, DLR handling, and live gateway monitoring; RBAC for admin/reseller/user.",
  "Designed million-row report downloads using queued jobs, chunked CSV generation, and ZIP packaging to avoid timeouts.",
  "Built Redis/Kafka-ready high-throughput ingestion, WhatsApp workflow/live chat/webhooks, and optimized EOD MIS dashboards with caching.",
].forEach(bullet);

entryHeader("IP TV / Digital Signage Campaign Platform");
stackLine("Laravel 12 · PHP 8.2 · MySQL · Laravel Sanctum · REST APIs · Blade");
[
  "Designed end-to-end campaign management for multi-outlet digital signage (users, outlets, devices, media, campaigns, reports).",
  "Implemented PIN-based device onboarding, real-time heartbeats, and campaign sync APIs for Android TV clients.",
  "Built playlist/timeline scheduling, media deduplication, and device-level runtime tracking.",
  "Delivered RBAC (Admin/User/Viewer/Reseller) and campaign performance reports (summary + detailed analytics).",
].forEach(bullet);

entryHeader("Dukandari Partners — Multi-Tenant Partner & Admin Platform");
stackLine("Laravel 12 · PHP 8.2 · MySQL · Blade · Tailwind · Vite · Razorpay · DomPDF · Queues");
[
  "Developed multi-role admin/partner dashboard for partner hierarchy, merchant onboarding, attributions, and account lifecycle management.",
  "Integrated Razorpay for subscriptions, plan upgrades, wallet/credit top-ups, CSV export, and transaction analytics.",
  "Built AI operations tooling (credentials, token/cost dashboards, request logs) and AI voice-agent call workflows with transcripts/recordings.",
  "Added Google Business Profile outlet audits, Facebook permission sync, PDF invoicing (DomPDF), and OTP-based secure login.",
].forEach(bullet);

entryHeader("Smart Inventory Management System");
stackLine("Laravel (Blade), PHP, MySQL | github.com/ShreyasNalawade/Sn_Inventory");
[
  "Built inventory workflows for daily stock intake, paid/unpaid bill tracking, and ledger/income records.",
  "Implemented credit interest calculations and operational reporting for market business use.",
  "Designed MySQL schema and Blade admin screens for day-to-day business operations.",
].forEach(bullet);

entryHeader("Live Chat Application (Real-Time Messaging)");
stackLine(
  "Laravel, WebSockets, Broadcasting Events | github.com/ShreyasNalawade/LiveChatApp-laravel-websocket"
);
[
  "Built real-time messaging using Laravel WebSockets and event broadcasting for instant chat updates.",
  "Implemented chat rooms, presence-style updates, and message delivery over websocket channels.",
  "Structured backend events/listeners for scalable real-time communication features.",
].forEach(bullet);

entryHeader("Dukandari.ai — AI Marketing Landing Page");
stackLine("HTML5, CSS3, JavaScript, GSAP | dukandari.ai");
[
  "Created conversion-focused SaaS landing page for AI marketing automation across Google, Facebook, Instagram, and WhatsApp.",
  "Built animated hero, pricing, and testimonial sections with responsive layout.",
  "Showcased multi-channel integration flows to support product marketing and lead capture.",
].forEach(bullet);

entryHeader("Sharashri — Folk Art & Culture Website");
stackLine("HTML5, CSS3, Tailwind CSS, JavaScript | sharashri.online");
[
  "Built responsive cultural showcase site with heritage storytelling layout and Marathi typography.",
  "Implemented event and gallery sections for folk-art content presentation.",
  "Delivered mobile-friendly UI with modern CSS and accessible navigation.",
].forEach(bullet);

section("Education");
entryHeader("Bachelor of Engineering (B.E.), Mechanical Engineering", "2021 – 2024");
doc
  .font("Helvetica")
  .fontSize(8.8)
  .fillColor("#333333")
  .text("Smt. Indira Gandhi College of Engineering (Mumbai University), Navi Mumbai — CGPA: 7.32");
doc.moveDown(0.28);
entryHeader("Diploma in Mechanical Engineering", "2018 – 2021");
doc
  .font("Helvetica")
  .fontSize(8.8)
  .fillColor("#333333")
  .text("Government Polytechnic Mumbai — 76.40%");
doc.moveDown(0.28);
entryHeader("SSC (10th Standard)", "2018");
doc
  .font("Helvetica")
  .fontSize(8.8)
  .fillColor("#333333")
  .text("Maharashtra State Board — 85.60%");

section("Certifications & Training");
entryHeader("Java Full Stack Development — QSpiders", "Completed");
doc.moveDown(0.08);
bullet(
  "Core Java (OOP, Collections, Exception Handling), JDBC, Servlets, JSP, Hibernate, SQL (Oracle), HTML, CSS, JavaScript."
);

section("Achievements");
[
  "Contributed to production CPaaS and IP-TV platforms serving millions of users with high-volume messaging, device sync, and analytics.",
  "Built million-row reporting pipelines and Redis/Kafka-ready ingestion for large-scale campaign workloads.",
  "Delivered Laravel + payments + AI integrations (Razorpay, voice-agent, usage analytics) across partner SaaS operations.",
].forEach(bullet);

doc.end();

stream.on("finish", () => {
  console.log("Created:", outPath);
  console.log("Pages:", pageCount);
});
