'use client'
import { ChangeEvent, ChangeEventHandler, FormEvent, useState } from "react";
import { addUser } from "@/lib/actions/users.action";

interface IFormData {
  firstname: string;
  lastname: string;
  email: string;
  pwd: string;
}

export default function Home() {
  const [formData, setFormData] = useState<IFormData>({
    firstname: "",
    lastname: "",
    email: "",
    pwd: "",
  });

  const handleChange = (e : ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>  ): Promise<void> => {
    e.preventDefault();
    try {
      await addUser(formData);
      alert("User added successfully!");
    } catch (err) {
      console.error("Error adding user: ", err);
      alert("Failed to add user: " + err);
    } finally {
      setFormData({firstname: "",
        lastname: "",
        email: "",
        pwd: ""})
    }
  };

  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="First Name"
          className="border p-2 rounded text-black required"
          required
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Last Name"
          className="border p-2 rounded text-black"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded text-black required"
          required
        />
        <input
          type="password"
          name="pwd"
          value={formData.pwd}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded text-black required"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
