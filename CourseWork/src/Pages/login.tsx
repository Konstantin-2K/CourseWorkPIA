import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    facultyNumber: string
    password: string
}

export const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()



    const onSubmit: SubmitHandler<Inputs> = (data) => {

    }


    console.log(watch("facultyNumber")) // watch input value by passing the name of it


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label>Faculty number</label>
            <input placeholder={"12345678"} {...register("facultyNumber")} />


            {/* include validation with required or other standard HTML validation rules */}
            <label>Password</label>
            <input {...register("password", {required: true})} />
            {/* errors will return when field validation fails  */}
            {errors.password && <span>Password is required</span>}


            <input id={"submit"} type="submit"/>
        </form>
    )
}
