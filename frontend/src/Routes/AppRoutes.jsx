import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../page/Home";
import ErrorPage from "../page/ErrorPage";
import Login from "../page/Login";
import SignUp from "../page/SignUp";
import TicketSearchPage from "../page/TicketSearchPage";
import TicketBooking from "../page/TicketBooking";
import Ticket from "../page/Ticket";
import CheckoutPage from "../page/CheckoutPage";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<TicketSearchPage />} />
        <Route path="/book/:id" element={<TicketBooking />} />
        <Route path="/ticket/:ticketId" element={<Ticket />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
