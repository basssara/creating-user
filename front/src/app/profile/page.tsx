"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "@/interfaces/user.interface";
import { UsersList } from "@/interfaces/users.interface";

export default function UserPage() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");

  const params = useParams<{ id: string }>();

  console.log(params);

  useEffect(() => {
    axios
      .get<User>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/`, {
        params: {
          id: params.id,
        },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg row-span-1"
        key={user?.id}
      >
        <img
          className="w-full object-cover h-48 w-96"
          src={process.env.NEXT_PUBLIC_BASE_URL + `${user?.profilePhoto}`}
          alt="User picture"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{user?.name}</div>
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
