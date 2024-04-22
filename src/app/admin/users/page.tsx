"use client"
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type User = {
    email: string,
    id: string,
    user_metadata: {
        name: string
    }
}

export default function Page() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('/api/users?key=test', {
            method: 'GET',
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setUsers(data.data.users);
        });
    }, []);

    return (
        <div className='w-full h-fit flex items-start flex-col'>
            {
                users.map((user, index) => {
                    return (
                    <a key={user.id} href={"users/" + user.id}>
                    <div key={index} className='my-1 rounded-3xl p-8 hover:bg-red-700 w-full transition-all'>{user.email + ' ' + user.id + ' ' + user.user_metadata.name}
                    </div>
                    </a>
                    )
                })
            }
        </div>
    )
}