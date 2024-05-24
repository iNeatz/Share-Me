import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

import { client } from '../client'

const Login = () => {
	const navigate = useNavigate()

	const responseGoogle = (response) => {
		const token = response.credential
		const decoded = jwtDecode(token)

		localStorage.setItem('user', JSON.stringify(decoded))

		const { name, sub: googleId, picture: imageUrl } = decoded

		const doc = {
			_id: googleId,
			_type: 'user',
			userName: name,
			image: imageUrl,
		}
		client.createIfNotExists(doc).then(() => {
			navigate('/', { replace: true })
		})
	}

	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className='relative w-full h-full'>
				<video
					src={shareVideo}
					type='video/mp4'
					loop
					controls={false}
					muted
					autoPlay
					className='w-full h-full object-cover'
				/>

				<div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
					<div className='p-5'>
						<img src={logo} alt='shareme' width='130px' />
					</div>

					<div className='shadow-2xl'>
						<GoogleLogin
							onSuccess={responseGoogle}
							onError={() => {
								console.log('Login Failed')
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
