// import { useMutation } from "@apollo/client";
// import { authenticatedUserVar } from "lib/apollo/cache";
// import client from "lib/apollo/client";
// import { LOGOUT } from "lib/apollo/queries";
import { useRouter } from "next/router"

export const Logout = () => {
  const router = useRouter()
  // let [logout] = useMutation(LOGOUT);

  const logoutHandler = async () => {
    // await logout();
    // await client.resetStore();
    localStorage.removeItem("userId")
    // authenticatedUserVar({ name: "", id: "" });
    router.push("/login")
  }

  return (
    <button type="button" className="button" onClick={logoutHandler}>
      Logout
    </button>
  )
}
