"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function ContactForm({ selectedService = "" }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      selectedPackage: selectedService,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Algo salió mal");
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
        <p className="text-white/60 max-w-sm">
          Gracias por contactarme. Te responderé en menos de 24 horas para empezar a potenciar tu negocio.
        </p>
        <Button 
          variant="outline" 
          className="mt-8 border-white/10 hover:bg-white/5"
          onClick={() => setIsSuccess(false)}
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {selectedService && (
        <div className="mb-4">
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 px-3 py-1">
            Interés: {selectedService}
          </Badge>
          <input type="hidden" {...register("selectedPackage")} />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 ml-1">Nombre Completo</label>
        <Input
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="Juan Pérez"
          className="bg-white/5 border-white/10 focus:border-accent/50 focus:ring-accent/20 transition-all h-12"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 ml-1">Correo Electrónico</label>
        <Input
          {...register("email", { 
            required: "El email es obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido"
            }
          })}
          type="email"
          placeholder="juan@empresa.com"
          className="bg-white/5 border-white/10 focus:border-accent/50 focus:ring-accent/20 transition-all h-12"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>}
      </div>

      {!selectedService && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">Servicio de Interés</label>
          <select
            {...register("selectedPackage")}
            className="w-full h-12 bg-white/5 border border-white/10 rounded-md px-3 text-white/70 focus:outline-none focus:border-accent/50 transition-all appearance-none"
          >
            <option value="" className="bg-[#0c0c1d]">Seleccionar servicio...</option>
            <option value="Landing Page" className="bg-[#0c0c1d]">Landing Page de Ventas</option>
            <option value="Web Corporativa" className="bg-[#0c0c1d]">Sitio Web Corporativo</option>
            <option value="Catalogo Digital" className="bg-[#0c0c1d]">Catálogo Digital</option>
            <option value="Chatbots IA" className="bg-[#0c0c1d]">Chatbots e IA</option>
          </select>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70 ml-1">Cuéntame sobre tu proyecto</label>
        <Textarea
          {...register("message", { required: "Cuéntame un poco qué necesitas" })}
          placeholder="Necesito una landing page que convierta más..."
          className="bg-white/5 border-white/10 focus:border-accent/50 focus:ring-accent/20 transition-all min-h-[120px] resize-none"
        />
        {errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message.message}</p>}
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-accent/90 text-[#0c0c1d] font-bold h-14 text-lg rounded-xl transition-all shadow-[0_0_20px_rgba(0,198,255,0.3)] hover:shadow-[0_0_30px_rgba(0,198,255,0.5)] group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar Solicitud
            <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </Button>

      <p className="text-center text-white/30 text-xs">
        Al enviar aceptas que te contacte para fines comerciales. Prometo no hacer spam.
      </p>
    </form>
  );
}
