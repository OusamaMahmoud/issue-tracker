"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {Skeleton} from "@/app/components";
const AssigneeSelect = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>("/api/users");
  //     setUsers(data);
  //   };
  //   fetchUsers();
  // });
  const {data:users ,error , isLoading } =useQuery<User[],Error>({
    queryKey:['users'],
    queryFn:()=>axios.get("/api/users").then(res => res.data),
    staleTime:60 * 1000 ,
    retry:3
  });
  if(isLoading) return <Skeleton/>
  if(error) return null;
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map((u) => (
            <Select.Item key={u.id} value={u.id}>
              {u.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;