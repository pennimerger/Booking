import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../contexts/AppContext"
import { Link, useLocation, useNavigate } from "react-router-dom"

export type RecoverFormData = {
  email: string
}

const Recover = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()
  // const queryClient = useQueryClient()


  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RecoverFormData>()

  const mutation = useMutation(apiClient.recover, {
    onSuccess: async () => {
      showToast({ message: "Reset link in inbox", type: "SUCCESS" })
      // await queryClient.invalidateQueries("validateToken")
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
      {/*<label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 4,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="m-0">
        <Link className="text-sm hover:underline" to="/recover">
        Forgot password?
        </Link>
      </span>*/}
      <span className="flex items-center justify-between">
        {/*<span className="text-sm">
          Not Registered?{" "}
          <Link className="text-blue-600 underline" to="/register">
            Create an account here
          </Link>
        </span>*/}
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