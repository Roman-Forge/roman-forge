// functions/subscribe.js
export async function onRequestPost(context) {
    return new Response(JSON.stringify({ message: "Subscribed!" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }