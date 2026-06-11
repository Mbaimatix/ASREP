import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const storedState = req.cookies.get("oauth_state")?.value;

  const fail = (msg: string) =>
    new NextResponse(errorHtml(msg), {
      headers: { "Content-Type": "text/html" },
    });

  if (!code) return fail("Missing OAuth code.");
  if (!state || state !== storedState) return fail("State mismatch — possible CSRF.");

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });

  const json = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!json.access_token) return fail(json.error ?? "Token exchange failed.");

  const token = json.access_token;
  const res = new NextResponse(successHtml(token), {
    headers: { "Content-Type": "text/html" },
  });
  res.cookies.set("oauth_state", "", { maxAge: 0, path: "/" });
  return res;
}

function successHtml(token: string) {
  const payload = JSON.stringify({ token, provider: "github" });
  return `<!DOCTYPE html><html><body><script>
(function(){
  function onMsg(e){
    window.opener.postMessage(
      'authorization:github:success:' + ${JSON.stringify(payload)},
      e.origin
    );
    window.close();
  }
  window.addEventListener("message", onMsg, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`;
}

function errorHtml(msg: string) {
  const payload = JSON.stringify({ error: msg });
  return `<!DOCTYPE html><html><body><script>
window.opener?.postMessage('authorization:github:error:' + ${JSON.stringify(payload)}, "*");
window.close();
</script></body></html>`;
}
