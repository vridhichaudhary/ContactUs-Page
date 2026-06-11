import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { contactSchema } from './schema';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    const submission = await prisma.contactSubmission.create({
      data: validatedData,
    });

    res.status(201).json({
      message: 'Message received successfully!',
      data: submission,
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    }

    console.error('Error processing contact form:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
