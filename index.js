addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const target = url.searchParams.get("url")

  if (!target) {
    return new Response("Missing `?url=` parameter.", { status: 400 })
  }

  try {
    const response = await fetch(target, {
      headers: {
        "User-Agent": request.headers.get("User-Agent") || "",
      },
    })

    const contentType = response.headers.get("content-type") || ""

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (e) {
    return new Response("Error fetching target URL:\n" + e.toString(), { status: 500 })
  }
}
