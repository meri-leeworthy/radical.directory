import { NextRequest, NextResponse } from "next/server"
import { getHmac } from "lib/getHmac"

export async function GET(request: NextRequest) {
  const value = request.nextUrl.searchParams.get("value")

  if (value) {
    const hmac = getHmac(value)
    console.log("hmac", hmac)
    return NextResponse.json({
      value,
      hmac,
      now: Date.now(),
    })
  }

  return NextResponse.json({
    hashed: false,
    now: Date.now(),
    message: "Pass a value to be hashed as a query parameter.",
  })
}
