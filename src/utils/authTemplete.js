import { sendEmail } from "./sendEmail.js";
import jwt from 'jsonwebtoken';


export const sendConfirmEmail = async (email, userName, req) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 * 5 });
  const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg, #007bff, #d97b32); padding: 30px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <img src="https://res.cloudinary.com/deylqxzgk/image/upload/c_thumb,w_200,g_face/v1740687998/2ea2907e-fda9-4b4c-bf50-abb69a5fa998.png" 
             alt="${process.env.APPNAME} Logo" 
             style="width: 180px; display: block; margin: auto; background: white; padding: 10px; border-radius: 10px;" />
             
        <h1 style="color: white; font-size: 28px; margin-top: 20px;">مرحبًا ${userName}!</h1>
        
        <p style="font-size: 16px; color: white; line-height: 1.6;">
          شكرًا لانضمامك إلى <b>${process.env.APPNAME}</b>! نحن متحمسون لوجودك معنا.
        </p>

        <p style="font-size: 16px; color: white; line-height: 1.6;">
          يرجى تأكيد بريدك الإلكتروني لتفعيل حسابك والاستمتاع بخدماتنا.
        </p>

        <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}" 
           style="display: inline-block; margin: 20px 0; padding: 12px 30px; font-size: 18px; font-weight: bold; color: white; background-color: #d97b32; text-decoration: none; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); transition: 0.3s;">
           تأكيد البريد الإلكتروني
        </a>

        <p style="font-size: 14px; color: white; margin-top: 20px;">
          لم تتلقَ البريد الإلكتروني؟ اضغط على الرابط أدناه لإعادة إرساله:
        </p>

        <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}" 
           style="display: inline-block; padding: 10px 20px; font-size: 14px; font-weight: bold; color: #d97b32; background: white; text-decoration: none; border-radius: 8px; border: 2px solid #d97b32; transition: 0.3s;">
           إعادة إرسال التأكيد
        </a>

        <p style="font-size: 12px; color: #f1f1f1; margin-top: 20px; line-height: 1.5;">
          صلاحية رابط التأكيد 5 دقائق. إذا لم تطلب ذلك، يرجى تجاهل هذا البريد.
        </p>

        <hr style="border: none; border-top: 1px solid white; margin: 20px 0;" />

      </div>
    </div>
  `;

  await sendEmail(email, 'تأكيد البريد الإلكتروني', html);
}


export const sendCodeToEmail = async (email, code) => {
  const html = `
   <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg, #007bff, #6c757d); padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
        <div style="display: inline-block; border-radius: 50%; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <img src="https://res.cloudinary.com/deylqxzgk/image/upload/v1738093063/logo_h7fcb2.png" 
               alt="${process.env.APPNAME} Logo" 
               style="width: 250px; display: block; margin: auto;" />
        </div>
        <h1 style="color: white; font-size: 28px; margin-top: 20px;">Your Verification Code</h1>
      </div>
      <p style="font-size: 16px; color: #f8f9fa; line-height: 1.5; margin: 20px 0;">
        Here is your code to reset your password.
      </p>
      <div style="background-color: #fff; padding: 15px; border-radius: 8px; display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin: 20px auto;">
        <p style="font-size: 24px; font-weight: bold; color: #333; margin: 0;">${code}</p>
      </div>
      <p style="font-size: 14px; color: #f8f9fa; margin: 20px 0;">
        Please enter this code in the reset password page to proceed.
      </p>
      <p style="font-size: 12px; color: #dee2e6; margin-top: 20px; line-height: 1.5;">
        If you did not request a password reset, please ignore this email. This code will expire automatically.
      </p>
      <hr style="border: none; border-top: 1px solid #6c757d; margin: 20px 0;" />
    </div>
  </div>`;
  await sendEmail(email, 'Reset Password', html);
}

export const confirmEmailMessage = (name, res) => {
  const html = `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg, #007bff, #d97b32); padding: 30px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
        <img src="https://res.cloudinary.com/deylqxzgk/image/upload/c_thumb,w_200,g_face/v1740687998/2ea2907e-fda9-4b4c-bf50-abb69a5fa998.png" 
             alt="${process.env.APPNAME} Logo" 
             style="width: 180px; display: block; margin: auto; background: white; padding: 10px; border-radius: 10px;" />
             
        <h1 style="color: white; font-size: 28px; margin-top: 20px;">شكرًا لتأكيد بريدك الإلكتروني، ${name}!</h1>
        
        <p style="font-size: 16px; color: white; line-height: 1.6;">
          تم تأكيد بريدك الإلكتروني بنجاح. يمكنك الآن الوصول إلى حسابك والاستمتاع بجميع ميزات <b>${process.env.APPNAME}</b>!
        </p>

        <p style="font-size: 16px; color: white; line-height: 1.6;">
          نحن سعداء بانضمامك إلينا، ونتطلع إلى تقديم خدماتنا لك.
        </p>

        <p style="font-size: 14px; color: white; margin: 20px 0;">
          إذا كان لديك أي استفسارات أو تحتاج إلى مساعدة، فلا تتردد في الاتصال بفريق الدعم لدينا.
        </p>

        <hr style="border: none; border-top: 1px solid white; margin: 20px 0;" />

        <footer style="font-size: 12px; color: #f1f1f1; text-align: center;">
          <p>© ${new Date().getFullYear()} ${process.env.APPNAME}. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  `;
  return res.send(html);
}
