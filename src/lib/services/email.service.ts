interface ContactNotificationInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendContactNotification(input: ContactNotificationInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL;
  const from = process.env.CONTACT_NOTIFICATION_FROM ?? "Prime Property <no-reply@primeproperty.id>";

  if (!apiKey || !to) {
    console.warn("[CONTACT_EMAIL] RESEND_API_KEY or CONTACT_NOTIFICATION_EMAIL is not configured.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Lead baru Prime Property: ${input.name}`,
      text: [
        `Nama: ${input.name}`,
        `Email: ${input.email}`,
        `Nomor HP: ${input.phone}`,
        "",
        input.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error("Gagal mengirim email notifikasi kontak.");
  }
}
