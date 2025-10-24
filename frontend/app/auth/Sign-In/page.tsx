"use client";

import * as React from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputHTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignIn, UserGetStatus } from "@/lib/actions/actions.user";

// Validação com Zod
const formSchema = z.object({
  email: z.string().email("Email é obrigatório"),
  password: z.string().min(5, "Senha é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

// Componente de input com erros
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, ...props }, ref) => (
    <div className="flex flex-col mb-3">
      <input
        ref={ref}
        {...props}
        className={`border rounded px-3 py-2 text-sm focus:outline-none focus:ring ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  )
);

TextInput.displayName = "TextInput";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (data: FormValues) => {
    setIsLoading(true);

    const res = await SignIn({ data });

    if (res.status === 200) {
      await UserGetStatus({ userId: data.email });
      await router.push("/dashboard/overview");
      toast.success("Parabéns Login sucedido");
    } else {
      toast.error(res.message);
      reset();
    }

    setIsLoading(false);
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-50">
      <div className="w-[420px] h-[490px] rounded shadow-md p-6 flex flex-col bg-white">
        {/* Header */}
        <div className="mb-4 text-center mb-4 flex flex-col items-center justify-center w-full">
          <a href="/">
            <Image src="/images/logo.png" width={160} height={160} alt="logotipo" />
          </a>
          <p className="text-gray-500 mt-2 text-sm">
            Digite seu e-mail e senha para acessar sua conta.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="flex-1 flex flex-col mt-4">
          {/* Email */}
          <label className="text-xs font-semibold mb-1">Email</label>
          <TextInput
            type="email"
            placeholder="Digite o seu email"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* Senha */}
          <label className="text-xs font-semibold mb-1">Senha</label>
          <div className="relative">
            <TextInput
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password")}
              error={errors.password?.message}
            />
            <div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full mt-4 text-sm text-white bg-gradient-to-r from-[#0B2353] to-[#364FCE] py-2 rounded disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Enviando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 flex flex-col space-y-2 w-full text-xs">
          <div className="flex items-center justify-between w-full">
            <a className="text-indigo-700 hover:text-pink-700" href="/auth/Forgot">
              <span className="text-gray-400">Esqueceu sua</span> senha?
            </a>
            <a className="text-indigo-700 hover:text-pink-700" href="/auth/Sign-Up">
              Criar uma conta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
