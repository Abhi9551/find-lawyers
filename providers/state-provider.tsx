"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SearchFilters = {
  practiceArea: string
  location: string
  rating: number
  availability: boolean
  freeConsultation: boolean
  keyword: string
}

type UserState = {
  isLoggedIn: boolean
  userId: string | null
  savedLawyers: string[]
}

type StateContextType = {
  searchFilters: SearchFilters
  updateSearchFilters: (filters: Partial<SearchFilters>) => void
  resetSearchFilters: () => void
  userState: UserState
  login: (userId: string) => void
  logout: () => void
  saveLawyer: (lawyerId: string) => void
  removeSavedLawyer: (lawyerId: string) => void
}

const defaultSearchFilters: SearchFilters = {
  practiceArea: "",
  location: "",
  rating: 0,
  availability: false,
  freeConsultation: false,
  keyword: "",
}

const defaultUserState: UserState = {
  isLoggedIn: false,
  userId: null,
  savedLawyers: [],
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: ReactNode }) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(defaultSearchFilters)
  const [userState, setUserState] = useState<UserState>(defaultUserState)

  const updateSearchFilters = (filters: Partial<SearchFilters>) => {
    setSearchFilters((prev) => ({ ...prev, ...filters }))
  }

  const resetSearchFilters = () => {
    setSearchFilters(defaultSearchFilters)
  }

  const login = (userId: string) => {
    setUserState((prev) => ({
      ...prev,
      isLoggedIn: true,
      userId,
    }))
  }

  const logout = () => {
    setUserState(defaultUserState)
  }

  const saveLawyer = (lawyerId: string) => {
    setUserState((prev) => ({
      ...prev,
      savedLawyers: [...prev.savedLawyers, lawyerId],
    }))
  }

  const removeSavedLawyer = (lawyerId: string) => {
    setUserState((prev) => ({
      ...prev,
      savedLawyers: prev.savedLawyers.filter((id) => id !== lawyerId),
    }))
  }

  return (
    <StateContext.Provider
      value={{
        searchFilters,
        updateSearchFilters,
        resetSearchFilters,
        userState,
        login,
        logout,
        saveLawyer,
        removeSavedLawyer,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export function useStateContext() {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider")
  }
  return context
}
