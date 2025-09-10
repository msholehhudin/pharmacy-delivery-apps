import { CreateUserData, User } from "@/types/user"


export const createUser = async(userData: CreateUserData): Promise<User> => {
    const res = await fetch("/api/users/insert", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          role: userData.role,
          name: userData.name,
          phone: userData.phone,
          status: userData.status || 'active'
        })
    })

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.error || "Failed to create user")
    }

    return res.json()
}


export const getUsers = async (): Promise<User[]> => {
  const res = await fetch("/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    cache: 'no-store'
  })

  if(!res.ok){
    const error = await res.json()
    throw new Error(error.error || "Failed to fetch user")
  }

  return res.json()
}

export const getUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`)

  if(!res.ok){
    const error = await res.json()
    throw new Error(error.error || "Failed to select user")
  }

  return res.json()
}

export const updateUser = async(id:string) => {
  const res = await fetch(`/api/users/${id}`)

  if(!res.ok){
    const error = await res.json()
    throw new Error(error.error || "Failed to update user")
  }

  return res.json()
}

export const deleteUser = async(id:string) => {
  const res = await fetch(`/api/users/${id}`)

  if(!res.ok){
    const error = await res.json()
    throw new Error(error.error || "Failed to update user")
  }

  return res.json()
}
