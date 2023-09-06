import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CsrfToken } from '../types'
import useStore from '../store'

const useError = () => {
  const navigate = useNavigate()
  const resetEditedDish = useStore((state) => state.resetEditedDish)

  const getCsrfToken = async () => {
    const { data } = await axios.get<CsrfToken>(
      `${process.env.REACT_APP_API_URL}/csrf`
    )

    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token
  }

  const switchErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        alert('CSRF token is invalid, please try again')
        navigate('/')
        break
      case 'invalid or expired jwt':
        alert('access token expired, please login')
        resetEditedDish()
        navigate('/')
        break
      case 'missing or malformed jwt':
        alert('access token is not valid, please login')
        resetEditedDish()
        navigate('/')
        break
      case 'duplicated key not allowed':
        alert("既に登録されているユーザー名です。他のユーザー名を検討下さい。")
        break
      case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
        alert("ユーザー名、もしくはパスワードが間違っています。")
        break
      case 'record not found':
        alert("ユーザー名、もしくはパスワードが間違っています。")
        break
      default:
        alert(msg)
    }
  }

  return { switchErrorHandling }
}

export default useError
