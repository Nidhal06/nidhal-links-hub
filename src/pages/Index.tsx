import { useState, useRef } from "react";
import { Linkedin, Github, Globe, QrCode, Copy, Download, Check, ExternalLink } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import avatarImg from "@/assets/nidhal-avatar.jpg";

const PAGE_URL = "https://nidhalgharbi-links.lovable.app";

const links = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/nidhal-gharbi-536140385",
    icon: Linkedin,
    color: "168 80% 50%",
  },
  {
    label: "GitHub",
    url: "https://github.com/Nidhal06",
    icon: Github,
    color: "250 70% 60%",
  },
  {
    label: "Portfolio",
    url: "https://nidhalgharbi-portfolio.netlify.app",
    icon: Globe,
    color: "200 80% 55%",
  },
];

const Index = () => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);

  const copyLink = async () => {
    await navigator.clipboard.writeText(PAGE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const canvas = document.querySelector("#qr-canvas canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "nidhal-gharbi-qr.png";
    a.click();
  };

  return (
    <div className="gradient-bg min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* SEO */}
      <title>Nidhal Gharbi — Developer & Tech Enthusiast</title>
      <meta name="description" content="Connect with Nidhal Gharbi — Developer and Tech Enthusiast. Find all links in one place." />

      <main className="w-full max-w-md mx-auto flex flex-col items-center gap-8 animate-fade-in">
        {/* Avatar */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full overflow-hidden glow-ring border-2 border-primary/30 bg-secondary">
            <img
              src={avatarImg}
              alt="Nidhal Gharbi"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
        </div>

        {/* Name & Role */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold font-display gradient-text">Nidhal Gharbi</h1>
          <p className="text-muted-foreground text-sm tracking-wide">Developer / Tech Enthusiast</p>
        </div>

        {/* Links */}
        <nav className="w-full flex flex-col gap-3" aria-label="Social links">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button flex items-center gap-4 text-foreground group"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <link.icon className="w-5 h-5 text-primary shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="flex-1 text-sm font-medium">{link.label}</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex gap-3 w-full">
          <button
            onClick={copyLink}
            className="link-button flex-1 flex items-center justify-center gap-2 text-sm text-foreground"
          >
            {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={() => setShowQR(!showQR)}
            className="link-button flex-1 flex items-center justify-center gap-2 text-sm text-foreground"
          >
            <QrCode className="w-4 h-4 text-muted-foreground" />
            QR Code
          </button>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="w-full rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-6 flex flex-col items-center gap-4 animate-scale-in">
            <p className="text-sm font-medium text-foreground">Scan to connect</p>
            <div id="qr-canvas" className="bg-foreground p-3 rounded-xl">
              <QRCodeCanvas
                value={PAGE_URL}
                size={180}
                bgColor="hsl(210, 20%, 92%)"
                fgColor="hsl(220, 20%, 7%)"
                level="H"
                ref={qrRef}
              />
            </div>
            <button
              onClick={downloadQR}
              className="link-button flex items-center gap-2 text-sm text-foreground px-5 py-2.5"
            >
              <Download className="w-4 h-4" />
              Save QR Code
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <p className="text-xs text-muted-foreground/60">Made by <span className="gradient-text font-medium">Nidhal</span></p>
      </footer>
    </div>
  );
};

export default Index;
