"use client";

import * as React from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/actions.user";

// Validação com Zod
const formSchema = z.object({
  email: z.string().email("Email é obrigatório"),
  first_name: z.string().min(5, "O nome é obrigatório"),
  last_name: z.string().min(5, "Sobrenome é obrigatório"),
  password: z.string().min(5, "Senha é obrigatória"),
  password2: z.string().min(5, "Confirmação é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

// Componente de input com mensagem de erro
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  const [showPassword2, setShowPassword2] = useState(false);

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
      first_name: "",
      last_name: "",
      password: "",
      password2: "",
    },
  });

  const submit = async (data: FormValues) => {
    setIsLoading(true);
    const res = await signUp({ data });

    if (res.status === 201) {
      router.push("/auth/otp/verify");
      toast.success("Parabéns cadastro bem sucedido");
    } else {
      toast.error(res.message);
      reset();
    }

    setIsLoading(false);
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="w-[470px] h-[590px] rounded shadow-md p-6 flex flex-col bg-white">
        {/* Header */}
        <div className="text-center mb-4 flex flex-col items-center justify-center w-full">
          <a href="/">
            <Image src="/images/logo.png" width={160} height={160} alt="logotipo" />
          </a>
          <p className="text-xs mt-2">
            Bem-vindo à nossa página de registro! Comece criando sua conta.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="flex-1 flex flex-col mt-4 space-y-4">
          <TextInput
            type="email"
            placeholder="Digite o seu email"
            {...register("email")}
            error={errors.email?.message}
          />
          <TextInput
            type="text"
            placeholder="Primeiro Nome"
            {...register("first_name")}
            error={errors.first_name?.message}
          />
          <TextInput
            type="text"
            placeholder="Último Nome"
            {...register("last_name")}
            error={errors.last_name?.message}
          />

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

          <div className="relative">
            <TextInput
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirme a senha"
              {...register("password2")}
              error={errors.password2?.message}
            />
            <div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-sm text-white bg-gradient-to-r from-[#0B2353] to-[#364FCE] h-9"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Enviando...
              </>
            ) : (
              "Enviar os dados"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 flex flex-col space-y-2 w-full text-xs items-center">
          <span>Você já é um membro?</span>
          <a className="text-indigo-700 hover:text-pink-700" href="/auth/Sign-In">
            Faça login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
