import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import { TransformerService } from '../services/transformer.service';

const prisma = new PrismaClient();
const transformer = new TransformerService();

const COMMISSION_RATE = 0.10; // 10% de comisión

interface CommetWithCommission {
  id: string;
  amount: number;
  salesperson: string;
  date: Date;
  commission: number;
}

export class CommetController {
  public async clearDatabase(req: Request, res: Response): Promise<Response> {
    try {
      await prisma.commet.deleteMany({});

      return res.status(200).json({
        message: 'Database cleared successfully'
      });
    } catch (error: unknown) {
      console.error('Error en clearDatabase:', error);
      
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message
        });
      }

      return res.status(500).json({
        error: 'Ocurrió un error inesperado'
      });
    }
  }

  public async getAllCommets(req: Request, res: Response): Promise<Response> {
    try {
      const commets = await prisma.commet.findMany({
        orderBy: {
          date: 'desc'
        }
      });

      // Calcular comisiones y formatear datos
      const commetsWithCommission: CommetWithCommission[] = commets.map(commet => ({
        ...commet,
        commission: commet.amount * COMMISSION_RATE
      }));

      // Calcular total de comisiones
      const totalCommissions = commetsWithCommission.reduce((sum, commet) => sum + commet.commission, 0);

      // Crear tabla con los nombres exactos solicitados
      const tableRows = commetsWithCommission.map(commet => ({
        id: commet.id,
        amount: commet.amount,
        salesperson: commet.salesperson,
        date: commet.date,
        commission: commet.commission
      }));

      return res.status(200).json({
        data: commets, // Datos originales para compatibilidad
        formattedData: {
          table: tableRows,
          summary: {
            totalDeals: commets.length,
            totalAmount: commets.reduce((sum, commet) => sum + commet.amount, 0),
            totalCommissions: totalCommissions
          }
        }
      });
    } catch (error: unknown) {
      console.error('Error en getAllCommets:', error);
      
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message
        });
      }

      return res.status(500).json({
        error: 'Ocurrió un error inesperado'
      });
    }
  }

  public async createCommets(req: Request, res: Response): Promise<Response> {
    try {
      // Validar que el cuerpo de la solicitud sea un array
      if (!Array.isArray(req.body)) {
        return res.status(400).json({
          error: 'Entrada inválida: se esperaba un array de datos de commet'
        });
      }

      // Transformar los datos al formato estándar
      const standardizedData = transformer.transformArrayToStandardFormat(req.body);

      // Crear o actualizar los registros en la base de datos
      const results = await Promise.all(
        standardizedData.map(async (commet) => {
          const data: Prisma.commetUpsertArgs = {
            where: {
              id: commet.id || 'generated-' + Math.random().toString(36).substr(2, 9)
            },
            create: {
              id: commet.id || 'generated-' + Math.random().toString(36).substr(2, 9),
              amount: commet.amount,
              salesperson: commet.salesperson,
              date: commet.date
            },
            update: {
              amount: commet.amount,
              salesperson: commet.salesperson,
              date: commet.date
            }
          };

          return prisma.commet.upsert(data);
        })
      );

      return res.status(201).json({
        message: 'Commets creados/actualizados exitosamente',
        data: results
      });

    } catch (error: unknown) {
      console.error('Error en createCommets:', error);
      
      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message
        });
      }

      return res.status(500).json({
        error: 'Ocurrió un error inesperado'
      });
    }
  }
}
