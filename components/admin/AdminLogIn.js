import { useRef } from "react"

export default function AdminLogIn({login, error}) {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const pinRef = useRef();

    function handleClick(e) {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const pin = Number(pinRef.current.value);

        login(username, password, pin);
    }


    return <div>
        <div className="form">
        <h1 className="text-center m-4">This is Admin Login Page. Log in with your Credentials to access Admin Panel</h1>
            <input className="input" type='text' autoComplete="false" placeholder='username' ref={usernameRef} />
            <input className="input" type='password' autoComplete="false" placeholder='password' ref={passwordRef} />
            <input className="input" type='number' autoComplete="false" placeholder='pin' ref={pinRef} />
            <button className="p-2 border-none text-white bg-gray-500 outline-none hover:bg-gray-700" onClick={handleClick}>Login</button>
            {error && <p className="text-center text-red-600">{error}</p>}
        </div>
    </div>
}