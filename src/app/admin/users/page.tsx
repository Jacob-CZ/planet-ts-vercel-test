"use client"
import { Input } from '@/components/ui/input';
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
    const [searchTerm, setSearchTerm] = useState("");
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
            <Input 
                className="w-fit bg-[#4D956D] text-[#FCFBE4] p-4 mx-8 my-2" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            {
                    users.filter(user => 
                        (user.email?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) || 
                        (user.user_metadata.name?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
                    ).map((user, index) => {
                    return (
                    <a key={user.id} href={"users/" + user.id}>
                        <div key={index} className='my-1 rounded-3xl p-4 hover:bg-[#4D956D] hover:text-[#FCFBE4] w-full transition-all border-4 m-4 duration-1000'>
                        {user.email + ' ' + user.user_metadata.name}
                        </div>
                    </a>
                    )
                })
            }
        </div>
    )
}