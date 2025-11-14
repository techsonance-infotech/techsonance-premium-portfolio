import {
  Html,
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export const EmailTemplate = ({
  name,
  email,
  company,
  subject,
  message,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4" }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Heading style={{ color: "#0A1A2F", fontSize: "24px", marginBottom: "20px" }}>
            New Contact Form Submission
          </Heading>
          <Hr style={{ borderColor: "#00C2FF", marginBottom: "20px" }} />
          
          <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
            <strong>From:</strong> {name}
          </Text>
          
          <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
            <strong>Email:</strong> {email}
          </Text>
          
          {company && (
            <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
              <strong>Company:</strong> {company}
            </Text>
          )}
          
          <Text style={{ fontSize: "16px", color: "#333", marginBottom: "10px" }}>
            <strong>Subject:</strong> {subject}
          </Text>
          
          <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />
          
          <Text style={{ fontSize: "16px", color: "#333", lineHeight: "1.6", marginBottom: "20px" }}>
            <strong>Message:</strong>
          </Text>
          <Text style={{ fontSize: "16px", color: "#333", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {message}
          </Text>
          
          <Hr style={{ borderColor: "#e0e0e0", margin: "20px 0" }} />
          
          <Text style={{ fontSize: "12px", color: "#999", marginTop: "20px" }}>
            This email was sent from the TechSonance InfoTech contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};
