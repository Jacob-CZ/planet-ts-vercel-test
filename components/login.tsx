"use client"
import { createClient } from "@/src/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { User, UserResponse } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { FaGoogle } from "react-icons/fa";
import { cn } from "@/lib/utils"
import Image from "next/image"
export default function Login(props: { visible?: boolean, classname?: string}) {
	const [resetpassword, setResetpassword] = useState(false)
	const [user, setUser] = useState<User | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [visible, setVisible] = useState<boolean>(false)
	const supabase = createClient()
	useEffect(() => {
		if (props.visible) setVisible(props.visible)
	}, [props.visible])
	async function login(Data: FormData) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: Data.get("email") as string,
			password: Data.get("password") as string,
		})
		if (error) {
			console.error(error)
			setError(error.message)
		}
		if (data.user) {
			console.log(data)
			setUser(data.user)
			setError(null)
		}
	}
	async function signup(Data: FormData) {
		console.log(Data.get("email"))

		const { data, error } = await supabase.auth.signUp({
			email: Data.get("email") as string,
			password: Data.get("password") as string,
		})
		if (error) {
			console.error(error)
			setError(error.message)
		}
		if (data.user) {
			console.log(data)
			setUser(data.user)
			setError(null)
		}
	}
	async function resetPassword(data: FormData) {
		const { error } = await supabase.auth.resetPasswordForEmail(
			data.get("email") as string
		)
		if (error) {
			console.error(error)
			setError(error.message)
		}
	}
	async function getUser() {
		const usr = await supabase.auth.getUser()
		console.log(usr)
		setUser(usr.data.user)
		return usr
	}
	async function logout() {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error(error)
			setError(error.message)
		}
		if (!error) setError(null)
		setUser(null)
	}
	async function LoginWithGoogle() {
		await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		})
	}

	async function LoginWithFacebook() {
		await supabase.auth.signInWithOAuth({
			provider: "facebook",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		})
	}
	useEffect(() => {
		getUser()
	}, [])

	return (
		<>
		<div onClick={() => setVisible(!visible)} className={cn(props.classname, "rounded-full overflow-hidden flex items-center justify-center w-fit h-fit")}> 
		{!user?.email && <Button className="">Log in</ Button>}
		{user?.email && <Image height={50} width={50} src={user?.user_metadata.avatar_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />}
		</div>
		{visible && (
		<div className="fixed w-screen h-screen pointer-events-[all] bg-[#ffffff3b] flex items-center justify-center top-0 left-0 z-50">
			<div className="p-12 border-4 rounded-3xl backdrop-blur-xl border-[#4D956D]">
			<Button className="absolute top-4 right-4 rounded-full w-8 h-8" onClick={() => setVisible(false)}>X</Button>
				{user?.email && (
					<div>
						Logged in as {user?.email}
						<Button variant="destructive" onClick={logout}>
							Log out
						</Button>
					</div>
				)}
				{!user?.email && !resetpassword  && (
					<div>
						<form>
							<Input
								className=" text-stone-900 my-2"
								id="email"
								name="email"
								type="email"
								required
								placeholder="email"
							/>
							<Input
								className=" text-stone-900 my-2"
								id="password"
								name="password"
								type="password"
								required
								placeholder="password"
							/>
							<div className="flex flex-row">
								<Button
									className="flex-grow mr-1"
									formAction={login}
								>
									Log in
								</Button>
								<Button
									className="flex-grow mx-1"
									formAction={signup}
								>
									Sign up
								</Button>
								<Button
									className="flex-grow ml-1"
									onClick={() =>
										setResetpassword(!resetpassword)
									}
								>
									Reset Password
								</Button>
							</div>
							<p>{error}</p>
						</form>
						<div className="flex flex-row justify-between mt-2">
						<Button className="align-middle" onClick={LoginWithGoogle}>
							<FaGoogle className="" />
							oogle
						</Button>
						<Button
							onClick={LoginWithFacebook}
						>
							Log in with Facebook
						</Button>
						</div>
					</div>
				)}
				{resetpassword && (
					<>
						<Button className="w-8 p-6 rounded-full mb-2" onClick={() => setResetpassword(false)}>back</Button>
						<form>
							<Input
								className=""
								id="email"
								name="email"
								type="email"
								placeholder="email"
								required
							/>
							<Button className="w-full" formAction={resetPassword}>
								Reset password
							</Button>
						</form>
					</>
				)}
			</div>
		</div>)}
		</>
	)
}
