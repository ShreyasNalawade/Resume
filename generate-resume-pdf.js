const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "Shreyas_Nalawade_Resume.pdf");
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 30, bottom: 30, left: 38, right: 38 },
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
  ensureSpace(28);
  doc.moveDown(0.42);
  doc.font("Helvetica-Bold").fontSize(10.2).fillColor("#111111").text(title.toUpperCase(), {
    characterSpacing: 0.55,
  });
  const y = doc.y + 2.5;
  doc.moveTo(left, y).lineTo(rightEdge, y).lineWidth(1).strokeColor("#111111").stroke();
  doc.y = y + 7;
}

function bullet(text) {
  ensureSpace(22);
  const textX = left + 12;
  const startY = doc.y;
  doc.font("Helvetica").fontSize(8.8).fillColor("#111111");
  doc.text("•", left, startY, { width: 10 });
  doc.text(text, textX, startY, {
    width: pageWidth - 12,
    align: "left",
    lineGap: 1.8,
  });
  doc.moveDown(0.26);
}

function entryHeader(title, date) {
  ensureSpace(22);
  doc.moveDown(0.12);
  const titleWidth = pageWidth * 0.72;
  const dateWidth = pageWidth * 0.28;
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9.3).fillColor("#111111").text(title, left, y, {
    width: titleWidth,
  });
  const titleBottom = doc.y;
  if (date) {
    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .fillColor("#333333")
      .text(date, left + titleWidth, y, { width: dateWidth, align: "right" });
  }
  doc.y = Math.max(titleBottom, doc.y) + 1.5;
}

function stackLine(text) {
  doc
    .font("Helvetica-Oblique")
    .fontSize(8)
    .fillColor("#444444")
    .text(text, { width: pageWidth, lineGap: 1 });
  doc.moveDown(0.1);
}

const profilePath = path.join(__dirname, "profile.png");
const photoSize = 64;
const photoX = rightEdge - photoSize;
const photoY = doc.page.margins.top;
const headerWidth = pageWidth - photoSize - 12;

if (fs.existsSync(profilePath)) {
  doc.image(profilePath, photoX, photoY, {
    width: photoSize,
    height: photoSize,
    fit: [photoSize, photoSize],
    align: "center",
    valign: "center",
  });
}

doc.font("Helvetica-Bold").fontSize(16.5).fillColor("#111111").text("SHREYAS NALAWADE", left, photoY, {
  width: headerWidth,
});
doc.moveDown(0.14);
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor("#222222")
  .text("Full Stack Developer | Java | Spring Boot | Laravel | React | Linux / VPS", left, doc.y, {
    width: headerWidth,
  });
doc.moveDown(0.18);
doc
  .font("Helvetica")
  .fontSize(8.2)
  .fillColor("#333333")
  .text(
    "Mumbai, Maharashtra, India  |  +91 86527 21345  |  shreyasnalawade2002@gmail.com",
    left,
    doc.y,
    { width: headerWidth, lineGap: 1.8 }
  );
doc.text("linkedin.com/in/shreyas-s-nalawade-234340283", left, doc.y, { width: headerWidth });
doc.text("github.com/ShreyasNalawade  |  shreyas.ssngo.shop", left, doc.y, { width: headerWidth });
doc.y = Math.max(doc.y, photoY + photoSize + 8);

section("Professional Summary");
doc
  .font("Helvetica")
  .fontSize(8.8)
  .fillColor("#111111")
  .text(
    "Results-driven Full Stack Developer with 1.5+ years of production experience delivering CPaaS, digital signage, and SaaS platforms serving millions of users. Built high-throughput messaging, device sync, payment, and AI features using Java, Spring Boot, Laravel/PHP, React, MySQL/MariaDB, MongoDB, Redis, and Kafka. Hands-on with Linux VPS administration, networking (SSH, DNS, Firewall), Nginx/Apache deployments, GitHub Actions CI/CD, and performance-focused REST APIs.",
    { width: pageWidth, align: "left", lineGap: 2.2 }
  );

section("Technical Skills");
const skills = [
  ["Languages", "Java, JavaScript, PHP 8.2, SQL, HTML5, CSS3, Bash basics"],
  ["Backend", "Laravel, Spring Boot, REST APIs, Webhooks, Horizon Queues, JDBC, Hibernate, OOP, SDLC"],
  ["Frontend", "React.js, Blade, Vite, Tailwind CSS, jQuery, Responsive UI"],
  ["Databases", "MySQL, MariaDB, MongoDB, Redis, Oracle SQL, Query Optimization"],
  ["Integrations", "Kafka, SMPP/Kannel, WhatsApp Cloud API, RCS, Razorpay, Google Business, SMTP, WebSockets"],
  ["DevOps / Infra", "Linux (Ubuntu), VPS Admin, Networking (TCP/IP, SSH, DNS, Firewall), Nginx, Apache, GitHub Actions CI/CD, Git, Postman"],
  ["Soft Skills", "Problem Solving, Team Collaboration, Requirement Analysis, Client Communication, Agile Delivery"],
];
skills.forEach(([label, value]) => {
  ensureSpace(13);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(8.7).fillColor("#111111").text(label + ":", left, y, {
    width: 90,
  });
  doc.font("Helvetica").fontSize(8.7).fillColor("#111111").text(value, left + 94, y, {
    width: pageWidth - 94,
    lineGap: 1.1,
  });
  doc.moveDown(0.14);
});

section("Professional Experience");
entryHeader("Software Engineer — Insign Technology Pvt Ltd", "Mar 2025 – Present");
doc
  .font("Helvetica-Oblique")
  .fontSize(8.3)
  .fillColor("#333333")
  .text("Mumbai, Maharashtra | Full Stack Development (CPaaS, Digital Signage & SaaS Platforms)");
doc.moveDown(0.18);
[
  "Multichannel CPaaS — Built Laravel SMS/RCS/WhatsApp/Voice/Email campaign platform with Kannel + Redis/Kafka pipelines; supported millions of end users and million-row reporting without timeouts.",
  "IP TV Platform — Developed digital signage system managing 1,000+ Android TV devices with device APIs, playlist scheduling, RBAC, and analytics across multi-outlet networks.",
  "Dukandari Partners — Delivered multi-tenant partner portal with Razorpay billing, AI usage/cost tracking, Google Business outlets, and AI voice-agent call support.",
  "Deployed and maintained production apps on Linux VPS (Nginx/Apache, SSH, firewall rules, DNS); automated CI/CD with GitHub Actions and reduced release effort for team deployments.",
].forEach(bullet);

section("Projects");

entryHeader("Multichannel Messaging Platform (CPaaS) — SMS, RCS, WhatsApp, Voice & Email");
stackLine(
  "PHP 8.2 · Laravel · MySQL/MariaDB · Redis · Kafka · Horizon · SMPP/Kannel · WhatsApp Cloud API · Linux VPS · REST APIs"
);
[
  "Built production CPaaS serving millions of users for bulk campaigns, DLR tracking, billing, and admin ops across 5 channels (SMS, RCS, WhatsApp, Voice, Email).",
  "Integrated Kannel SMS gateway (SMPP) with vendor/route management and live monitoring; implemented RBAC for admin/reseller/user roles.",
  "Designed queued report downloads for millions of rows (chunked CSV + ZIP), cutting memory failures/timeouts during large exports.",
  "Built Redis/Kafka-ready ingestion handling tens of millions of records; optimized EOD MIS dashboards with caching for faster reporting.",
].forEach(bullet);

entryHeader("IP TV / Digital Signage Campaign Platform");
stackLine("Laravel 12 · PHP 8.2 · MySQL · Laravel Sanctum · REST APIs · Blade · Device Networking");
[
  "Designed end-to-end campaign platform for multi-outlet digital signage covering users, outlets, devices, media, campaigns, and reports.",
  "Implemented PIN onboarding, heartbeat monitoring, and REST sync for 1,000+ Android TV clients with reliable device-server networking.",
  "Built playlist/timeline scheduling and runtime tracking; delivered RBAC (Admin/User/Viewer/Reseller) with summary + detailed analytics.",
  "Improved campaign delivery visibility through device-level status reporting and performance dashboards for operations teams.",
].forEach(bullet);

entryHeader("Dukandari Partners — Multi-Tenant Partner & Admin Platform");
stackLine("Laravel 12 · PHP 8.2 · MySQL · Blade · Tailwind · Vite · Razorpay · DomPDF · Queues");
[
  "Built multi-role partner dashboard for merchant onboarding, attributions, and full account lifecycle management.",
  "Integrated Razorpay subscriptions, plan upgrades, and wallet/credit top-ups with CSV export and transaction analytics.",
  "Delivered AI token/cost dashboards, voice-agent call initiate/hangup with transcripts/recordings, and DomPDF invoicing + OTP login.",
  "Added Google Business outlet audits and Facebook permission sync for connected merchant accounts.",
].forEach(bullet);

entryHeader("Smart Inventory Management System");
stackLine("Laravel (Blade), PHP, MySQL | github.com/ShreyasNalawade/Sn_Inventory");
[
  "Built inventory workflows for stock intake, paid/unpaid billing, ledger/income tracking, and credit interest calculations.",
  "Designed MySQL schema and Blade admin UI that reduced manual spreadsheet effort for day-to-day market operations.",
  "Added operational reports to improve payment visibility and daily income tracking accuracy.",
].forEach(bullet);

entryHeader("Live Chat Application (Real-Time Messaging)");
stackLine(
  "Laravel, WebSockets, Broadcasting Events | github.com/ShreyasNalawade/LiveChatApp-laravel-websocket"
);
[
  "Built real-time chat with Laravel WebSockets/event broadcasting for instant message delivery.",
  "Implemented chat rooms and presence-style updates over websocket channels for multi-user conversations.",
  "Structured events/listeners for maintainable, scalable real-time communication features.",
].forEach(bullet);

entryHeader("Dukandari.ai — AI Marketing Landing Page");
stackLine("HTML5, CSS3, JavaScript, GSAP | dukandari.ai");
[
  "Created conversion-focused SaaS landing page for AI marketing across Google, Facebook, Instagram, and WhatsApp.",
  "Built animated hero, pricing, and testimonials with responsive UI to support lead capture.",
  "Showcased multi-channel integration flows for product marketing and onboarding clarity.",
].forEach(bullet);

entryHeader("Sharashri — Folk Art & Culture Website");
stackLine("HTML5, CSS3, Tailwind CSS, JavaScript | sharashri.online");
[
  "Built responsive cultural showcase with Marathi typography, event, and gallery sections.",
  "Delivered mobile-friendly UI with accessible navigation for heritage storytelling content.",
  "Optimized layout and assets for fast loading on desktop and mobile devices.",
].forEach(bullet);

section("Education");
entryHeader("Bachelor of Engineering (B.E.), Mechanical Engineering", "2021 – 2024");
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor("#333333")
  .text("Smt. Indira Gandhi College of Engineering (Mumbai University), Navi Mumbai — CGPA: 7.32");
doc.moveDown(0.22);
entryHeader("Diploma in Mechanical Engineering", "2018 – 2021");
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor("#333333")
  .text("Government Polytechnic Mumbai — 76.40%");
doc.moveDown(0.22);
entryHeader("SSC (10th Standard)", "2018");
doc
  .font("Helvetica")
  .fontSize(8.5)
  .fillColor("#333333")
  .text("Maharashtra State Board — 85.60%");

section("Certifications & Training");
entryHeader("Java Full Stack Development — QSpiders", "Completed");
doc.moveDown(0.06);
bullet(
  "Core Java (OOP, Collections, Exception Handling), JDBC, Servlets, JSP, Hibernate, SQL (Oracle), HTML, CSS, JavaScript."
);

section("Achievements");
[
  "Supported production platforms used by millions of users and 1,000+ active Android TV devices with high-volume messaging and device sync.",
  "Built million-row reporting and Redis/Kafka-ready ingestion for tens of millions of records with improved export reliability.",
  "Managed Linux VPS deployments (Nginx/Apache, SSH, DNS, firewall) and CI/CD pipelines for faster, safer production releases.",
  "Delivered Laravel + Razorpay + AI integrations that improved partner billing visibility and AI usage/cost tracking.",
].forEach(bullet);

doc.end();

stream.on("finish", () => {
  console.log("Created:", outPath);
  console.log("Pages:", pageCount);
});
