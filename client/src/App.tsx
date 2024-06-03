import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./queryClient";
import { Home } from "./views/home";
import { UpdateSettlement } from "./views/update-settlement";
import { RespondSettlement } from "./views/respond-settlement";
import { ErrorPage } from "./views/error-page";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Box w="100vw" h="100vh">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/update-settlement/:uuid"
                element={<UpdateSettlement />}
              />
              <Route
                path="/respond-settlement/:uuid"
                element={<RespondSettlement />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
