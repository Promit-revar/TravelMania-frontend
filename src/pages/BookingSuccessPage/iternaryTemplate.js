import moment from "moment"
export const iternaryTemplate = (bookingDetails) => {
    return (
        `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hotel Booking Itinerary</title>
            <style>
            html {
                -webkit-print-color-adjust: exact;
            }
            </style>
        </head>
        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 0;">
            <div style="max-width: 800px; margin: 50px auto; background: white; border-radius: 12px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <div style="background-color: #399A7A !important; padding: 20px; color: white; display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 1.5em;">Booking Itinerary</div>
                    <div>
                        <div style='display: flex;
                        flex-direction: column;
                        font-size: 30px;
                        font-weight: 200;
                        cursor: default'>
                            <span style=" margin-bottom:'-14px'">Phuket</span>
                            <span >Concierge</span>
                        </div>
                    </div>
                </div>
                <div style="padding: 20px;">
                    <div style="display: flex; flex-direction: row; justify-content: space-between;">
                    <div>Booking Ref: ${bookingDetails?.referenceNum}</div><div>Supplier Confirmation: ${bookingDetails?.supplierConfirmationNum}</div></div>
                    <div style="background-color: #ffffff; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e0e0e0;">
                        <div style="font-size: 1.5em; margin-bottom: 10px; color: #333; border-bottom: 2px solid #399A7A; padding-bottom: 5px;">Guest and Room Information</div>
                        <p style="margin: 10px 0; color: #555;"><strong>Hotel Name:</strong> ${bookingDetails?.hotelName}</p>
                        <p style="margin: 10px 0; color: #555;"><strong>Check-in Date:</strong> ${moment(new Date(bookingDetails?.roomBookDetails?.checkIn)).format("DD, MMM YYYY")}</p>
                        <p style="margin: 10px 0; color: #555;"><strong>Check-out Date:</strong> ${moment(new Date(bookingDetails?.roomBookDetails?.checkOut)).format("DD, MMM YYYY")}</p>
                        <p style="margin: 10px 0; color: #555;"><strong>Room Details:</strong> ${bookingDetails?.roomBookDetails?.rooms[0]?.name}</p>
                        <p style="margin: 10px 0; color: #555;"><strong>Cancellation Policy:</strong> ${bookingDetails?.roomBookDetails?.cancellationPolicy}</p>
                        <p style="margin: 10px 0; color: #555;"><strong>Number of Guests:</strong> ${bookingDetails?.roomBookDetails?.rooms.length} Adults</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #e0e0e0;">
                        <div style="font-size: 1.5em; margin-bottom: 10px; color: #333; border-bottom: 2px solid #399A7A; padding-bottom: 5px;">Price Breakout</div>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <th style="border: 1px solid #e0e0e0; padding: 15px; text-align: left; background-color: #f4f4f9;">Description</th>
                                <th style="border: 1px solid #e0e0e0; padding: 15px; text-align: left; background-color: #f4f4f9;">Amount</th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">Room Rate (${bookingDetails?.roomBookDetails?.days} nights)</td>
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">${bookingDetails?.roomBookDetails?.NetPrice} ${bookingDetails?.roomBookDetails?.currency}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">Taxes and Fees</td>
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">0.00 ${bookingDetails?.roomBookDetails?.currency}</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">Additional Services</td>
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">0.00 ${bookingDetails?.roomBookDetails?.currency}</td>
                            </tr>
                            <tr style="font-weight: bold; font-size: 1.2em;">
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">Total</td>
                                <td style="border: 1px solid #e0e0e0; padding: 15px; background-color: #fafafa;">${bookingDetails?.roomBookDetails?.NetPrice} ${bookingDetails?.roomBookDetails?.currency}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </body>
        </html>`
    )
}