"use client";

import { usePathname, useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function DetailLink(props: Props) {
  const router = useRouter();
  // console.log("pathname: ", usePathname());
  return (
    <button
      onClick={() => {
        router.push(`/detail/${props.id}`);
      }}
    >
      Detail Link
    </button>
  );
}
