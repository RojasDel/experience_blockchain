"use client"

import { useReadContract } from "wagmi"
import { carbonoABI } from "@/lib/abi/carbono"
import { experienciaABI } from "@/lib/abi/experiencia"
import { config } from "@/lib/config"

export function useBalances(address: `0x${string}` | undefined) {
  // Query Carbono token balance
  const { data: carbonoBalance, refetch: refetchCarbono } = useReadContract({
    address: config.carbonoAddress,
    abi: carbonoABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // Query Experiencia NFT balance
  const { data: experienciaBalance, refetch: refetchExperiencia } = useReadContract({
    address: config.experienciaAddress,
    abi: experienciaABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  const refetchBalances = () => {
    refetchCarbono()
    refetchExperiencia()
  }

  return {
    carbonoBalance: carbonoBalance ? Number(carbonoBalance) / 10**18 : 0, // Convert from wei to tokens
    experienciaBalance: experienciaBalance ? Number(experienciaBalance) : 0,
    refetchBalances,
    isLoading: false, // wagmi handles loading states internally
  }
}