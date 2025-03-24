export const fieldMappings = {
  // Mapeo para el campo 'amount'
  amount: [
    'amount',
    'total',
    'value',
    'price',
    'deal_value',
    'deal_amount',
    'sale_amount',
    'sale_value',
    'transaction_amount',
    'transaction_value'
  ],

  // Mapeo para el campo 'salesperson'
  salesperson: [
    'salesperson',
    'rep_name',
    'representative',
    'sales_rep',
    'agent',
    'seller',
    'employee',
    'sales_agent',
    'sales_person',
    'representative_name'
  ],

  // Mapeo para el campo 'date'
  date: [
    'date',
    'created_on',
    'sold_at',
    'sale_date',
    'transaction_date',
    'deal_date',
    'created_at',
    'timestamp',
    'closed_at',
    'completed_at'
  ],

  // Mapeo para el campo 'id' (aunque en nuestro caso generamos UUID)
  id: [
    'id',
    'deal_id',
    'transaction_id',
    'sale_id',
    'reference',
    'ref',
    'identifier',
    'external_id',
    'record_id',
    'unique_id'
  ]
};
