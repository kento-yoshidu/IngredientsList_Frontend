import useMutateAuth from '../hooks/useMutateAuth'
import { useQueryClient } from '@tanstack/react-query'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import styles from "../styles/logout.module.css"

const LogOut = () => {
  const queryClient = useQueryClient()
  const { logoutMutation } = useMutateAuth()

  const logout = async () => {
    await logoutMutation.mutateAsync()
    queryClient.removeQueries(['dishes'])
  }

  return (
    <button
      className={styles.button}
      onClick={logout}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
      ログアウト
    </button>
  )
}

export default LogOut
