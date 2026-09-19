const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "Shreyas_Nalawade_Resume.pdf");
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 40, bottom: 40, left: 44, right: 44 },
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
  doc.moveDown(0.75);
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
  doc.y = y + 10;
}

function bullet(text) {
  ensureSpace(28);
  const textX = left + 14;
  const startY = doc.y;
  doc.font("Helvetica").fontSize(9.8).fillColor("#111111");
  doc.text("•", left, startY, { width: 12 });
  doc.text(text, textX, startY, {
    width: pageWidth - 14,
    align: "left",
    lineGap: 2.5,
  });
  doc.moveDown(0.45);
}

function entryHeader(title, date) {
  ensureSpace(28);
  doc.moveDown(0.2);
  const titleWidth = pageWidth * 0.7;
  const dateWidth = pageWidth * 0.3;
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(10.2).fillColor("#111111").text(title, left, y, {
    width: titleWidth,
  });
  const titleBottom = doc.y;
  if (date) {
    doc
      .font("Helvetica-Bold")
      .fontSize(9.2)
      .fillColor("#333333")
      .text(date, left + titleWidth, y, { width: dateWidth, align: "right" });
  }
  doc.y = Math.max(titleBottom, doc.y) + 2;
}

// Header
doc.font("Helvetica-Bold").fontSize(19).fillColor("#111111").text("SHREYAS NALAWADE");
doc.moveDown(0.25);
doc
  .font("Helvetica-Bold")
  .fontSize(10.2)
  .fillColor("#222222")
  .text("Full Stack Developer | Java | Spring Boot | Laravel | React");
doc.moveDown(0.35);
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor("#333333")
  .text(
    "Mumbai, Maharashtra, India  |  shreyashnalawade09@gmail.com  |  linkedin.com/in/shreyas-s-nalawade-234340283",
    { width: pageWidth, lineGap: 2 }
  );
doc.moveDown(0.1);
doc.text("github.com/ShreyasNalawade  |  shreyas.ssngo.shop", { width: pageWidth });

section("Professional Summary");
doc
  .font("Helvetica")
  .fontSize(9.8)
  .fillColor("#111111")
  .text(
    "Full Stack Developer with production experience building SaaS CRMs, business automation platforms, and high-traffic messaging systems. Skilled in Java, Spring Boot, Laravel/PHP, React, JavaScript, MySQL, and MongoDB. At Insign Technology, delivered end-to-end web systems covering REST APIs, real-time features, database design, and client-facing UIs. Strong in converting business requirements into scalable, maintainable software with focus on performance, security, and clean architecture.",
    { width: pageWidth, align: "left", lineGap: 3 }
  );

section("Technical Skills");
const skills = [
  ["Languages", "Java, JavaScript, PHP, SQL, HTML5, CSS3"],
  ["Backend", "Spring Boot, Laravel, REST APIs, JDBC, Hibernate, Node fundamentals"],
  ["Frontend", "React.js, JavaScript, Tailwind CSS, jQuery, Responsive UI"],
  ["Databases", "MySQL, MongoDB, Oracle SQL, Redis"],
  ["Tools / DevOps", "Git, GitHub, GitHub Actions (CI/CD), Linux/VPS, phpMyAdmin, Postman"],
  ["Other", "WebSockets, WhatsApp Cloud API, SMTP, Selenium (Java), OOP, SDLC"],
];
skills.forEach(([label, value]) => {
  ensureSpace(18);
  const y = doc.y;
  doc.font("Helvetica-Bold").fontSize(9.8).fillColor("#111111").text(label + ":", left, y, {
    width: 100,
  });
  doc.font("Helvetica").fontSize(9.8).fillColor("#111111").text(value, left + 105, y, {
    width: pageWidth - 105,
    lineGap: 2,
  });
  doc.moveDown(0.35);
});

section("Professional Experience");
entryHeader("Software Engineer — Insign Technology Pvt Ltd", "Mar 2025 – Present");
doc
  .font("Helvetica-Oblique")
  .fontSize(9.2)
  .fillColor("#333333")
  .text("Mumbai, Maharashtra | Full Stack Development (SaaS, CRM & Business Automation)");
doc.moveDown(0.4);
[
  "Develop and maintain SaaS CRM and business management applications using Laravel, React.js, Java, and MySQL for advertising and SMB clients.",
  "Built a Dental Clinic Management System with patient records, appointment booking, billing/invoicing, and digital prescriptions (Laravel, MySQL, Tailwind).",
  "Engineered an IP-TV Control Engine enabling single-click ad broadcast, 6-digit device pairing, campaign scheduling, and WebSocket-based live device control at scale.",
  "Delivered a Smart Inventory & Finance Manager for market operations: stock intake, paid/unpaid bill tracking, daily ledger/income, and credit interest calculations.",
  "Developed a Bulk WhatsApp & Email Campaign Engine with personalized media, chatbot flows, Redis-backed high-speed delivery, and per-contact downloadable reports.",
  "Designed REST APIs, optimized MySQL schemas/queries, and deployed production systems on Linux/VPS with Git-based CI/CD workflows.",
  "Collaborated with clients to gather requirements, ship iterative releases, and improve UX for operational dashboards and admin panels.",
].forEach(bullet);

section("Projects");

entryHeader("Live Chat Application (Real-Time Messaging)");
doc
  .font("Helvetica-Oblique")
  .fontSize(9)
  .fillColor("#444444")
  .text("Laravel, WebSockets, Broadcasting Events | github.com/ShreyasNalawade/LiveChatApp-laravel-websocket");
doc.moveDown(0.2);
bullet(
  "Built a real-time messaging app using Laravel WebSockets and event broadcasting for instant chat updates."
);

entryHeader("Smart Inventory Management System");
doc
  .font("Helvetica-Oblique")
  .fontSize(9)
  .fillColor("#444444")
  .text("Laravel (Blade), PHP, MySQL | github.com/ShreyasNalawade/Sn_Inventory");
doc.moveDown(0.2);
bullet(
  "Developed inventory workflows for stock tracking, billing status, and operational reporting used in business day-to-day operations."
);

entryHeader("Dukandari.ai — AI Marketing Platform (Frontend)");
doc
  .font("Helvetica-Oblique")
  .fontSize(9)
  .fillColor("#444444")
  .text("HTML5, CSS3, JavaScript, GSAP | dukandari.ai");
doc.moveDown(0.2);
bullet(
  "Created a conversion-focused SaaS landing page showcasing multi-channel marketing automation (Google, Facebook, Instagram, WhatsApp)."
);

entryHeader("Sharashri — Folk Art & Culture Website");
doc
  .font("Helvetica-Oblique")
  .fontSize(9)
  .fillColor("#444444")
  .text("HTML5, CSS3, Tailwind CSS, JavaScript | sharashri.online");
doc.moveDown(0.2);
bullet(
  "Built a responsive cultural showcase site with Marathi typography, event/gallery sections, and storytelling layout."
);

section("Education");
entryHeader("Bachelor of Engineering (B.E.), Mechanical Engineering", "2021 – 2024");
doc
  .font("Helvetica")
  .fontSize(9.3)
  .fillColor("#333333")
  .text("Smt. Indira Gandhi College of Engineering (Mumbai University), Navi Mumbai — CGPA: 7.32");
doc.moveDown(0.55);
entryHeader("Diploma in Mechanical Engineering", "2018 – 2021");
doc
  .font("Helvetica")
  .fontSize(9.3)
  .fillColor("#333333")
  .text("Government Polytechnic Mumbai — 76.40%");

section("Certifications & Training");
entryHeader("Java Full Stack Development — QSpiders", "Completed");
doc.moveDown(0.15);
bullet(
  "Core Java (OOP, Collections, Exception Handling), JDBC, Servlets, JSP, Hibernate, SQL (Oracle), HTML, CSS, JavaScript."
);

section("Achievements");
[
  "Transitioned from Mechanical Engineering into Full Stack Development through structured Java training and production project delivery.",
  "Independently owned multiple client-facing systems (CRM, IPTV broadcast, inventory finance, messaging automation) from requirement analysis to deployment.",
  "Improved large-scale data processing workflows (including bulk MySQL operations) and implemented CI/CD auto-deployment for Laravel apps on VPS.",
  "Delivered production UIs and backend modules used by real businesses in healthcare, advertising/broadcasting, and retail operations.",
].forEach(bullet);

doc.end();

stream.on("finish", () => {
  console.log("Created:", outPath);
});
