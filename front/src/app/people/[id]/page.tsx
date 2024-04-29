"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "@/interfaces/user.interface";
import { UsersList } from "@/interfaces/users.interface";

export default function UserPage({ params }) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");

  const id = params.id;

  console.log(params);

  useEffect(() => {
    axios
      .get<User>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${id}`)
      .then((res) => setUser(res.data.data))
      .catch((err) => setError(err.message));
  }, [id]);

  console.log(user);

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <div className="" key={user?.id}>
        <div className="h-screen flex items-center justify-center">
          <img
            className="rounded-full object-cover h-48 w-96 mb-24"
            src={process.env.NEXT_PUBLIC_BASE_URL + `${user?.profilePhoto}`}
            alt="User picture"
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 ">{user?.name}</div>
          <p className="text-gray-700 text-base">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Date of birth:
            </span>
            {user?.dateBirth?.toString()}
          </p>
        </div>
      </div>
    </div>
  );
}
