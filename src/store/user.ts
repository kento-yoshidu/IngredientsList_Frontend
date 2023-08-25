import { create } from "zustand"

type LoginUser = {
  name: string
}

type UserState = {
  loginUser: LoginUser
  resetLoginUser: () => void
}

const useUserStore = create<UserState>((set) => ({
  loginUser: { name: "" },
  resetLoginUser: () => set({ loginUser: { name: "" }})
}))

export default useUserStore
