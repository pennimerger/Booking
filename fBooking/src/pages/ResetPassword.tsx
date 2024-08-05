import { useForm } from "react-hook-form"
import { useMutation } from "react-query"
import * as apiClient from "../api-client"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'

export type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>()

  const mutation = useMutation(apiClient.resetPassword, {
    onSuccess: async () => {
      navigate("/sign-in")
    },
    onError: (error: Error) => {
      console.log(error)
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    token ? (
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Reset your password</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        New Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match"
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
        </label>
        <span className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          >
            Confirm
          </button>
        </span>
      </form>
      ) : (
        <div className="flex justify-center items-center mt-20">
          <h2 className="text-red-500 md:text-8xl text-5xl font-bold">Permission denied.</h2>
        </div>
      )
  )
}

export default ResetPassword