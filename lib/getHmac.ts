import { createHmac } from "crypto"

export function getHmac(input: string) {
  const typedArray = new Uint8Array([
    198, 23, 83, 130, 184, 238, 245, 103, 176, 241, 141, 97, 41, 243, 59, 191,
    39, 223, 77, 228, 98, 179, 196, 117, 191, 141, 45, 154, 99, 101, 216, 61,
  ])
  // const random32Bytes = crypto.getRandomValues(typedArray)
  const hmac = createHmac("sha256", typedArray)
  hmac.update(input)
  console.log(typedArray)
  return hmac.digest("hex")
}
