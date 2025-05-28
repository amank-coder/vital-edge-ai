// components/BotpressChatbot.js
'use client';

import Script from 'next/script';

export default function Chatbot() {
  return (
    <>
      {/* Botpress Webchat Core Script */}
      <Script
        src="https://cdn.botpress.cloud/webchat/v2.5/inject.js"
        strategy="afterInteractive"
      />

      {/* Your Unique Bot Script */}
      <Script
        src="https://files.bpcontent.cloud/2025/05/13/07/20250513072820-V6B8QE86.js"
        strategy="afterInteractive"
      />
    </>
  );
}
