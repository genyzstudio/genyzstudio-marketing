/** Inline styles and table layout keep the email usable without remote assets. */
export function loginCodeEmail(code: string, locale: string) {
  if (!/^\d{6}$/.test(code)) throw new Error('Invalid login code');
  const en = locale === 'en';
  const copy = en ? {
    subject: 'Your GenYZ workshop login code',
    preview: 'Your workshop is ready. Use your one-time code to continue.',
    label: 'WORKSHOP ACCESS', title: 'Your next story starts here.',
    intro: 'Welcome to GenYZ Studio. Use the code below to enter your AI video workshop and bring your ideas to life, one step at a time.',
    codeLabel: 'YOUR LOGIN CODE', expiry: 'Valid for up to 10 minutes · One use only',
    heading: 'Continue to your workshop',
    steps: ['Return to the workshop tab you opened.', 'Enter the same email address and the code above.', 'Choose a module and continue at your own pace.'],
    tip: 'Keep your workshop tab open while checking your email. If your code expires, request a new one from the login page.',
    security: 'Keep this code private. If you did not request it, you can safely ignore this email.',
    help: 'Need a hand?', reply: 'Reply to this email — we’re here to help.',
    tagline: 'From your first idea to your first AI video.',
  } : {
    subject: 'Mã đăng nhập workshop GenYZ',
    preview: 'Workshop đã sẵn sàng. Dùng mã một lần để tiếp tục.',
    label: 'TRUY CẬP WORKSHOP', title: 'Câu chuyện tiếp theo bắt đầu từ bạn.',
    intro: 'Chào mừng bạn đến với GenYZ Studio. Dùng mã bên dưới để vào workshop AI video và từng bước biến ý tưởng thành video của riêng bạn.',
    codeLabel: 'MÃ ĐĂNG NHẬP CỦA BẠN', expiry: 'Có hiệu lực tối đa 10 phút · Chỉ dùng một lần',
    heading: 'Vào workshop trong vài bước',
    steps: ['Quay lại tab workshop bạn đã mở.', 'Nhập đúng email này cùng với mã bên trên.', 'Chọn một module và học theo nhịp của bạn.'],
    tip: 'Giữ tab workshop mở khi kiểm tra email. Nếu mã hết hạn, hãy yêu cầu mã mới tại trang đăng nhập.',
    security: 'Không chia sẻ mã này. Nếu bạn không yêu cầu mã, hãy bỏ qua email này.',
    help: 'Bạn cần hỗ trợ?', reply: 'Trả lời email này — chúng tôi sẵn sàng giúp bạn.',
    tagline: 'Từ ý tưởng đầu tiên đến AI video đầu tiên.',
  };
  const text = `${copy.title}\n\n${copy.intro}\n\n${copy.codeLabel}: ${code}\n${copy.expiry}\n\n${copy.heading}\n${copy.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n${copy.tip}\n\n${copy.security}\n\n${copy.help} ${copy.reply}\ngenyzstudio@gmail.com\n\nGenYZ Studio — ${copy.tagline}`;
  const html = `<!doctype html>
<html lang="${en ? 'en' : 'vi'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${copy.subject}</title></head>
<body style="margin:0;padding:0;background-color:#141617;color:#f4f2eb;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${copy.preview}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#141617;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="560" cellspacing="0" cellpadding="0" style="width:100%;max-width:560px;">
<tr><td style="padding:0 8px 26px;font-size:26px;font-weight:800;letter-spacing:-1px;color:#f4f2eb;">gen<span style="color:#f3c778;">yz</span><span style="font-size:13px;font-weight:400;letter-spacing:2px;"> &nbsp; STUDIO</span></td></tr>
<tr><td style="background-color:#1e2021;border:1px solid #383b3b;border-top:3px solid #f3c778;border-radius:12px;padding:32px 24px;">
<p style="margin:0 0 18px;color:#f3c778;font-size:11px;font-weight:bold;letter-spacing:2px;">${copy.label}</p>
<h1 style="margin:0 0 18px;font-size:32px;line-height:1.2;letter-spacing:-0.7px;color:#f4f2eb;">${copy.title}</h1>
<p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#b8b9b5;">${copy.intro}</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="background-color:#f3c778;border-radius:8px;padding:24px 8px;color:#141617;">
<p style="margin:0 0 12px;font-size:10px;letter-spacing:1.5px;font-weight:bold;">${copy.codeLabel}</p>
<p style="margin:0;font-family:'Courier New',monospace;font-size:36px;line-height:1.3;font-weight:bold;letter-spacing:5px;">${code}</p>
<p style="margin:12px 0 0;font-size:11px;line-height:1.6;">${copy.expiry}</p>
</td></tr></table>
<h2 style="margin:28px 0 14px;font-size:17px;line-height:1.5;color:#f4f2eb;">${copy.heading}</h2>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${copy.steps.map((step, i) => `<tr><td valign="top" width="28" style="padding:0 0 12px;color:#f3c778;font-size:13px;line-height:1.7;font-weight:bold;">0${i + 1}</td><td style="padding:0 0 12px;font-size:14px;line-height:1.7;color:#f4f2eb;">${step}</td></tr>`).join('')}</table>
<p style="margin:8px 0 24px;font-size:13px;line-height:1.7;color:#b8b9b5;">${copy.tip}</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td style="border-top:1px solid #383b3b;padding-top:20px;"><p style="margin:0;font-size:12px;line-height:1.7;color:#b8b9b5;">${copy.security}</p></td></tr></table>
</td></tr>
<tr><td style="padding:24px 8px 0;font-size:12px;line-height:1.8;color:#b8b9b5;"><p style="margin:0 0 6px;color:#f4f2eb;font-weight:bold;">${copy.help}</p><p style="margin:0 0 8px;">${copy.reply}<br><a href="mailto:genyzstudio@gmail.com" style="color:#f3c778;text-decoration:underline;">genyzstudio@gmail.com</a></p><p style="margin:20px 0 0;font-size:11px;">GenYZ Studio &nbsp;·&nbsp; ${copy.tagline}</p></td></tr>
</table></td></tr></table></body></html>`;
  return { subject: copy.subject, text, html };
}
