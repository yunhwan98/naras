import { useRouter } from "next/router";
import React from "react";

function Country() {
  const router = useRouter();
  const { code } = router.query;

  return <div>{code}</div>;
}

export default Country;
