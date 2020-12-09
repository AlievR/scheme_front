import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

export const useMessage = (text) => {
  if (text) {
    return (
      toast.error( text,
        { position: toast.POSITION.TOP_RIGHT },)
    )
  }
}