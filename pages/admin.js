import {useState} from 'react';
import AdminPanel from '../components/admin/AdminPanel';
import AdminLogIn from '../components/admin/AdminLogIn';

export default function AdminPage() {
    // Dummy admin login !
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);

    function login(username, password, pin) {
        if (username === 'admin' && password === 'admin' && pin === 1234) {
            setIsAdmin(true);
        } else {
            setError('Invalid Credentials. Please Try Again.');
        }
    }

    function logout() {
        setIsAdmin(false);
    }

    return <div>
        {isAdmin ? <AdminPanel logout={logout} /> : <AdminLogIn error={error} login={login} />}
    </div>
}