import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import { useNavigate } from "react-router-dom"

export type RecoverFormData = {
  email: string
}

const Recover = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RecoverFormData>()

  const mutation = useMutation(apiClient.recover, {
    onSuccess: async () => {
      showToast({ message: "Reset link in inbox", type: "SUCCESS" })
      navigate("/sign-in")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Enter account email</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
        >
          Submit
        </button>
      </span>
    </form>
  )
}

export default Recover