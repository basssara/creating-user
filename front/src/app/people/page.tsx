"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { UsersList } from "@/interfaces/users.interface";

export default function UsersPage() {
  const [users, setUsers] = useState<UsersList[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get<UsersList[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/people`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <div className="grid grid-cols-4 gap-4 mx-48">
        {users.map((user) => (
          <div
            className="max-w-sm rounded overflow-hidden shadow-lg row-span-1"
            key={user.id}
          >
            <img
              className="w-full object-cover h-48 w-96"
              src={process.env.NEXT_PUBLIC_BASE_URL + `${user.profilePhoto}`}
              alt="User picture"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{user.name}</div>
              <p className="text-gray-700 text-base">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Date of birth:
                </span>
                {user.dateBirth?.toString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
