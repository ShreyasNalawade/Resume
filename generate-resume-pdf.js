const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "Shreyas_Nalawade_Resume.pdf");
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 38, bottom: 38, left: 42, right: 42 },
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

function ensureSpace(needed = 48) {
  if (doc.y + needed > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

function section(title) {
  ensureSpace(36);
  doc.moveDown(0.65);
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111").text(title.toUpperCase(), {
    characterSpacing: 0.7,
  });
  const y = doc.y + 4;
  doc
    .moveTo(left, y)
    .lineTo(rightEdge, y)
    .lineWidth(1)
    .strokeColor("#111111")
    .stroke();
  doc.y = y + 9;
}

function bullet(text) {
  ensureSpace(28);
  const textX = left + 14;
  const startY = doc.y;
  doc.font("Helvetica").fontSize(9.5).fillColor("#111111");
  doc.text("•", left, startY, { width: 12 });
  doc.text(text, textX, startY, {
    width: pageWidth - 14,
    align: "left",
    lineGap: 2.2,
  });
  doc.moveDown(0.38);
}

function entryHeader(title, date) {
  ensureSpace(28);
  doc.moveDown(0.15);
  const titleWidth = pageWidth * 0.7;
  const dateWidth = pageWidth * 0.3;
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111").text(title, left, y, {
    width: titleWidth,
  });
  const titleBottom = doc.y;
  if (date) {
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#333333")
      .text(date, left + titleWidth, y, { width: dateWidth, align: "right" });
  }
  doc.y = Math.max(titleBottom, doc.y) + 2;
}

function stackLine(text) {
  doc
    .font("Helvetica-Oblique")
    .fontSize(8.7)
    .fillColor("#444444")
    .text(text, { width: pageWidth, lineGap: 1.5 });
  doc.moveDown(0.18);
}

// Header
doc.font("Helvetica-Bold").fontSize(18).fillColor("#111111").text("SHREYAS NALAWADE");
doc.moveDown(0.22);
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#222222")
  .text("Full Stack Developer | Java | Spring Boot | Laravel | React");
doc.moveDown(0.3);
doc
  .font("Helvetica")
  .fontSize(8.8)
  .fillColor("#333333")
  .text(
    "Mumbai, Maharashtra, India  |  shreyashnalawade09@gmail.com  |  linkedin.com/in/shreyas-s-nalawade-234340283",
    { width: pageWidth, lineGap: 2 }
  );
doc.moveDown(0.08);
doc.text("github.com/ShreyasNalawade  |  shreyas.ssngo.shop", { width: pageWidth });

section("Professional Summary");
doc
  .font("Helvetica")
  .fontSize(9.5)
  .fillColor("#111111")
  .text(
    "Full Stack Developer with production experience building high-scale CPaaS messaging platforms and digital signage systems used by millions of end users. Skilled in Java, Spring Boot, Laravel/PHP, React, JavaScript, MySQL/MariaDB, MongoDB, Redis, and Kafka. At Insign Technology, worked with the team on enterprise SMS/RCS/WhatsApp/Voice/Email campaigns, IP-TV device networks, REST APIs, queues, and performance-focused reporting.",
    { width: pageWidth, align: "left", lineGap: 2.8 }
  );

section("Technical Skills");
const skills = [
  ["Languages", "Java, JavaScript, PHP 8.2, SQL, HTML5, CSS3"],
  ["Backend", "Laravel, Spring Boot, REST APIs, Webhooks, Queue Jobs (Horizon), JDBC, Hibernate"],
  ["Frontend", "React.js, JavaScript, Blade, Vite, Tailwind CSS, jQuery"],
  ["Databases", "MySQL, MariaDB, MongoDB, Redis, Oracle SQL"],
  ["Messaging", "Kafka, Redis, SMPP/Kannel, WhatsApp Cloud API, RCS, SMTP"],
  ["Tools", "Git, GitHub Actions, Linux/VPS, Laravel Sanctum, Telescope, Postman"],
];
skills.forEach(([label, value]) => {
  ensureSpace(18);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor("#111111").text(label + ":", left, y, {
    width: 95,
  });
  doc.font("Helvetica").fontSize(9.5).fillColor("#111111").text(value, left + 100, y, {
    width: pageWidth - 100,
    lineGap: 1.8,
  });
  doc.moveDown(0.28);
});

section("Professional Experience");
entryHeader("Software Engineer — Insign Technology Pvt Ltd", "Mar 2025 – Present");
doc
  .font("Helvetica-Oblique")
  .fontSize(9)
  .fillColor("#333333")
  .text("Mumbai, Maharashtra | Full Stack Development (CPaaS, Digital Signage & Business Systems)");
doc.moveDown(0.35);
[
  "Multichannel CPaaS Platform — Built scalable SMS/RCS/WhatsApp/Voice/Email campaign system in Laravel with Kannel gateway integration, Redis/Kafka pipelines, and million-row report generation serving millions of users.",
  "IP TV / Digital Signage Platform — Developed Laravel-based campaign management for multi-outlet Android TV networks with device APIs, playlist scheduling, RBAC, and analytics reporting.",
  "Developed and maintained SaaS CRM and business applications using Laravel, React.js, Java, and MySQL for advertising and SMB clients.",
  "Delivered Smart Inventory & Finance Manager, Dental Clinic Management System, and supporting REST APIs with CI/CD deployment on Linux/VPS.",
  "Collaborated with the team and clients on requirements, iterative releases, dashboards, and production monitoring.",
].forEach(bullet);

section("Projects");

entryHeader("Multichannel Messaging Platform (CPaaS) — SMS, RCS, WhatsApp, Voice & Email");
stackLine(
  "PHP 8.2 · Laravel · MySQL/MariaDB · Redis · Kafka · Horizon · SMPP/Kannel · WhatsApp Cloud API · REST APIs · Webhooks · Blade/Vite/Tailwind"
);
[
  "Built and maintained a production multichannel communication platform for bulk campaigns, delivery tracking, billing, and admin ops across SMS, RCS, WhatsApp, Voice, and Email — used by millions of users.",
  "Developed end-to-end campaign and reporting flows with role-based access (admin / reseller / user).",
  "Integrated Kannel SMS gateway (SMPP) — vendor management, route assignment, DLR handling, and live gateway monitoring.",
  "Designed large-scale report downloads (millions of rows) using queued jobs, chunked CSV generation, and ZIP packaging.",
  "Built high-throughput voting/ingestion features with Redis validation, DB partitioning, and Kafka-ready processing for tens of millions of records.",
  "Implemented WhatsApp automation/workflow builder, live chat, webhooks, campaign analytics, and optimized EOD MIS dashboards with caching.",
].forEach(bullet);

entryHeader("IP TV / Digital Signage Campaign Platform");
stackLine("Laravel 12 · PHP 8.2 · MySQL · Laravel Sanctum · REST APIs · Blade");
[
  "Designed and developed an end-to-end campaign management system for multi-outlet digital signage (users, outlets, devices, media, campaigns, reports).",
  "Implemented secure device onboarding (PIN-based registration), real-time heartbeats, and campaign sync via REST APIs for Android TV clients.",
  "Built advanced campaign scheduling (playlist + timeline segments), media deduplication, and device-level runtime tracking.",
  "Delivered role-based access (Admin / User / Viewer / Reseller) and campaign performance reports (summary + detailed analytics).",
].forEach(bullet);

entryHeader("Smart Inventory Management System");
stackLine("Laravel (Blade), PHP, MySQL | github.com/ShreyasNalawade/Sn_Inventory");
bullet(
  "Developed inventory workflows for stock tracking, billing status, ledger/income, and operational reporting."
);

entryHeader("Live Chat Application (Real-Time Messaging)");
stackLine(
  "Laravel, WebSockets, Broadcasting Events | github.com/ShreyasNalawade/LiveChatApp-laravel-websocket"
);
bullet(
  "Built a real-time messaging app using Laravel WebSockets and event broadcasting for instant chat updates."
);

entryHeader("Dukandari.ai — AI Marketing Platform (Frontend)");
stackLine("HTML5, CSS3, JavaScript, GSAP | dukandari.ai");
bullet(
  "Created a conversion-focused SaaS landing page showcasing multi-channel marketing automation."
);

entryHeader("Sharashri — Folk Art & Culture Website");
stackLine("HTML5, CSS3, Tailwind CSS, JavaScript | sharashri.online");
bullet(
  "Built a responsive cultural showcase site with Marathi typography, event/gallery sections, and storytelling layout."
);

section("Education");
entryHeader("Bachelor of Engineering (B.E.), Mechanical Engineering", "2021 – 2024");
doc
  .font("Helvetica")
  .fontSize(9.2)
  .fillColor("#333333")
  .text("Smt. Indira Gandhi College of Engineering (Mumbai University), Navi Mumbai — CGPA: 7.32");
doc.moveDown(0.45);
entryHeader("Diploma in Mechanical Engineering", "2018 – 2021");
doc
  .font("Helvetica")
  .fontSize(9.2)
  .fillColor("#333333")
  .text("Government Polytechnic Mumbai — 76.40%");

section("Certifications & Training");
entryHeader("Java Full Stack Development — QSpiders", "Completed");
doc.moveDown(0.12);
bullet(
  "Core Java (OOP, Collections, Exception Handling), JDBC, Servlets, JSP, Hibernate, SQL (Oracle), HTML, CSS, JavaScript."
);

section("Achievements");
[
  "Contributed to production CPaaS and IP-TV platforms serving millions of users with high-volume messaging, device sync, and analytics.",
  "Built million-row reporting pipelines and Redis/Kafka-ready ingestion flows for large-scale campaign and voting workloads.",
  "Transitioned from Mechanical Engineering into Full Stack Development through structured Java training and production project delivery.",
  "Delivered client-facing systems across messaging, digital signage, healthcare, inventory, and marketing domains with team collaboration.",
].forEach(bullet);

doc.end();

stream.on("finish", () => {
  console.log("Created:", outPath);
});
